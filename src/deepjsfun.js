

/* TODO:
 * - make it faster
 * - more accurate 
 * - consistent start (avoid starting at loss = 0.8 and a color missing etc.)
 * - clean the code : split it in functions, put in good variable names
 * - asynchronous image updates (if even possible) : update the image without stopping the learning process
 */

// original image
img = new Image;
img.src = "img/kitty.jpg";

const w = 200;
const h = 200;
// node output visualisation size ratio compared to original image (2 : half the original image size)
const node_output_scale = 2;

// smaller version of the input array, being the size of the node output visualisation image
// to avoid computing pixels that wont get displayed
// to be refactored with tys generation code
const visual_input = tf.tensor(gen_pixel_coords(w/node_output_scale, h/node_output_scale)) // visualisation input
  .sub(tf.scalar(w/node_output_scale/2))
  .cast('float32')
  .div(tf.scalar(w/node_output_scale));

// to get raw image data
const canvas = document.getElementById("orig");
const ctx = canvas.getContext("2d");

var model;
var imageData;
var LEARNING_RATE;

/*------plot initialisation (chart js library)------*/
var plotctx = document.getElementById("plot");

var lossdata = {
  labels: [],
  datasets:[{
    label: 'loss',
//    backgroundColor: 'rgba(230,53,93,0.4)',
    //backgroundColor: 'rgba(188,45,81,0.4)',
    backgroundColor: 'rgba(255,99,132,0.4)',
    data:[]
  }]
}
var options = {
  scales: {
    yAxes: [{
      display: true,
      //type: 'linear',
      //position: 'bottom',
      ticks: {
        //    suggestedMin: 0,
        beginAtZero: true
        //suggestedMax: 1
      }
    }]

  },
  maintainAspectRatio: true
} 

var losschart = new Chart(plotctx, {
  type: 'line',
  data: lossdata,
  options:options
});
/*--------------------------------------------------*/

// place model editor text area
make_config_forms();

img.onload = () => {
  // image is loaded

  ctx.drawImage(img, 0, 0);
  imageData = ctx.getImageData(0, 0, w,h);
  train(imageData);
}

// when user image is provided
$("#browse").on('change', function(ev) {
      var f = ev.target.files[0];
      var fr = new FileReader();
      model.stopTraining = true;
      fr.onload = function(ev2) {
        var image = new Image();
        image.onload = function(){
          ctx.drawImage(image, 0, 0);
          imageData = ctx.getImageData(0, 0, w, h);
          reload();
        }
        img.src = ev2.target.result;
      };
      fr.readAsDataURL(f);
});

function train(imageData) {

  const xs = gen_pixel_coords(w,h);

  var BATCH_SIZE;

  // executes the code inside the model editor text area
  eval($("#model_config").val());

  // construct node output visualisation canvases
  make_layers_canvas();

  // make a tensor from the pixel coords array, shape is inferred from the original array : [w*h,2]
  var txs = tf.tensor(xs);

  /* It apparently is a good idea to normalize the data, so coordinates are mapped from
   * 0-200 to -0.5,0.5
   */
  txs = txs.sub(tf.scalar(w/2));
  txs = tf.cast(txs,'float32');
  txs = txs.div(tf.scalar(w));

  /* put raw image data (array of bytes) into a tensor of shape [h,w,3]
   * reshape it to [h*w,3] so that each coordinates in txs corresponds
   * to a pixel
   */
  var tys = tf.fromPixels(imageData, 3).reshape([w*h,3]);

  // map 0-255 int to 0-1 float
  tys = tf.cast(tys,'float32');
  tys = tys.div(tf.scalar(255));

  /* Train the model using the data.
   * 
   * batchSize is the number of outputs to be computed before weights are updated
   * smaller batch size is slower, although the model will learn more in an epoch
   *
   * validationSplit is the ratio of data reserved for validation testing, the model 
   * will not be trained on it, we don't want any
   *
   * shuffle allows for batches inputs to be picked randomly, making it learn adjacent pixels
   * in a batch is somewhat biased
   *
   * callbacks are a list of function to be called at the end/beginning of each epoch/batch
   * it is used to update the image during the training
   */
  model.fit(txs, tys, { batchSize: BATCH_SIZE, epochs: 4000, validationSplit: 0, shuffle: true,callbacks: {
    onTrainBegin: () => {
      clear_canvas(document.getElementById("result"));
    },
    onTrainEnd: (epoch, logs) => {
      clear_chart();
    },
    onEpochBegin: async (epoch, logs) => {
    },
    onEpochEnd: async (epoch, logs) => {

      update_loss_chart(epoch,logs.loss);

      update_metrics({epoch: epoch, batch: logs.batch, loss: logs.loss});

      // every 2 epoch, update the result image
      if(epoch%2 != 0 && epoch > 0)
        return;

      model_output = get_model_output(txs);

      draw_image(model_output, document.getElementById("result"));

      draw_layers_output(visual_input);
    },
    onBatchBegin: async (epoch, logs) => {
      //    console.log("onBatchBegin" + epoch + JSON.stringify(logs))
    },
    onBatchEnd: async (epoch, logs) => {
      if(logs.batch%5 != 0 )
        return;
      // print log infos (loss etc) in the tag having id #epoch
      update_metrics({batch: logs.batch, loss: logs.loss});
    }
  }
  }).then(() => {
    console.log("done")
  });
}

// construct the model editor text area, initialize it with the default model layout
function make_config_forms(){
  model_def = " // Define a model for linear regression.\n\
  model = tf.sequential();\n\
  \n\
  const KERNEL_INIT = 'varianceScaling';\n\
  \n\
  // model layout is similar ConvNetJs' model \n\
  // 2 inputs : x,y \n\
  model.add(tf.layers.dense({units: 20, inputShape: [2], activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
  model.add(tf.layers.dense({units: 3, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
  // 3 outputs : rgb \n\
  \n\
  BATCH_SIZE = 250;\n\
  // did not tinker much with that \n\
  LEARNING_RATE = 0.1;\n\
  \n\
  // ConvNetJS has a momentum variable, so the optimizer was chosen accordingly \n\
  const MOMENTUM = 0.9;\n\
  const optimizer = tf.train.momentum(LEARNING_RATE,MOMENTUM);\n\
  // Prepare the model for training: Specify the loss and the optimizer. \n\
  model.compile({loss: 'meanSquaredError', optimizer: optimizer});"

  $("#model_config").val(model_def);

}

function gen_pixel_coords(w,h){
  /* generate pixel coords
   * makes a 2d array of wize h,w containing every pixel coordinates
   * [[0,0],[0,1]...[0,h],
   *  [1,0],  ...  ,[1,h],
   *  [w,0],  ...  ,[w,h]]
   * is used as input to the model
   */
  var xs = [];
  for(i=0;i<w;i++){
    for(j=0;j<h;j++){
      xs.push([i,j]);
    }
  }
  return xs
}

function reload(){
  model.stopTraining = true;
  
  train(imageData);
}

function clear_chart(){
  losschart.data.labels = [];
  losschart.data.datasets[0].data = [];
  losschart.update();
}

function clear_canvas(canvas){
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw_image(data,canvas){

  const ctx = canvas.getContext("2d");

  // trickery to draw the image on the canvas
  // ref : https://stackoverflow.com/questions/24236470/html5-can-i-create-an-image-object-from-an-imagedata-object
  var tmpcanvas = document.createElement('canvas');
  var tmpctx = tmpcanvas.getContext('2d');
  tmpcanvas.width = canvas.width;
  tmpcanvas.height = canvas.height;

  
  imagedata = tmpctx.createImageData(w,h);
  
  // for some reason a canvas only takes 4 channel images
  // copying data that way is faster than trying to insert
  // the 4th channel into the existing array
  var j = 0;
  for(i=0;i<data.length;){
    imagedata.data[j++] = data[i++];
    imagedata.data[j++] = data[i++];
    imagedata.data[j++] = data[i++];
    imagedata.data[j++] = 255; 
  }

  tmpctx.putImageData(imagedata, 0, 0);
  var image = new Image();
  image.onload=function(){
    // drawImage the img on the canvas
    ctx.drawImage(image,0,0);
  }
  image.src = tmpcanvas.toDataURL();

}

function update_loss_chart(x, loss){
  losschart.data.labels.push(x);
  losschart.data.datasets[0].data.push(loss);
  losschart.update();
}

function get_model_output(input){
  // get the model outputs for all pixel coordinates
  img_out = model.predict(input, {batchSize: 1000, verbose: true});//);

  // reformat it to bytes
  img_out = float2byte(img_out);
  //img_out.mul(tf.scalar(255));
  //img_out = tf.cast(img_out,'int32');

  // actually request the data (model.predict gives a promise)
  return Array.from(img_out.dataSync());
}

function float2byte(input){
  return tf.cast(input.mul(tf.scalar(255)),'int32');
}

function update_metrics(metrics){
  // print epoch number inside tag having id #epoch
  typeof metrics.epoch !== 'undefined' && ($('#epoch_info')[0].innerHTML=metrics.epoch);
  typeof metrics.batch !== 'undefined' && ($('#batch_info')[0].innerHTML=metrics.batch);
  typeof metrics.loss !== 'undefined' && ($('#loss_info')[0].innerHTML=metrics.loss);
}

/* computes the output of each layer
 * for every input (txs)
 * then isolates each node output
 * (still for every input) and displays it 
 * in a grayscale image (or rgb for the last layer)
 */
function draw_layers_output(input){

  // size of the node output visualisation
  const visu_h = 200/node_output_scale;
  const visu_w = 200/node_output_scale;

  var ts = input;
  var data;
  const layer_divs = $(".layer_output");
  // for each layer
  for(l=0;l<model.layers.length;l++){

    /* apply layer l to layer l-1 output
     * gives each node output for every input
     * data is layed out this way :
     *
     * with N nodes and M inputs
     * [ node0input0, ..., nodeNinput0, node0input1, ..., nodeNinput1, ..., nodeNinputM ]
     *
     * so to get all outputs for node 0 we start at 0 and take every N elements
     */
    ts = model.layers[l].apply(ts)

    // map the data from 0,1 to 0,255
    // tidy() intends to reduce memory leak
    data = tf.tidy( () => { return float2byte(ts.add(tf.scalar(0.5)).clipByValue(0,1)) }).dataSync();

    // get canvases on which the node outputs will be drawn
    const canvases = layer_divs.eq(l).find(".node_output");
    // for each node
    for(n=0;n<model.layers[l].units;n++){

      const ctx = canvases[n].getContext("2d");

      var imagedata = ctx.createImageData(visu_w,visu_h);
      var j = 0, k = 0;

      if(l == model.layers.length-1){
        // last layer, draw output nodes in their respective color
        for(i=0;i<data.length;i+=model.layers[l].units){
          // for each of this node's outputs
          for(m=0;m<3;m++){
            if(n==m)
              imagedata.data[k++] = data[i+n];
            else
              imagedata.data[k++] = 0;
          }
          imagedata.data[k++] = 255; 
        }
      }
      else{
        // not last layer, draw output in grayscale
        for(i=0;i<data.length;i+=model.layers[l].units){
          // for each of this node's outputs
          imagedata.data[k++] = data[i+n];
          imagedata.data[k++] = data[i+n];
          imagedata.data[k++] = data[i+n];
          imagedata.data[k++] = 255; 
        }
      }
      ctx.putImageData(imagedata, 0, 0);
    }
  }
  // remove ts from memory (garbage collector is a lazy chap)
  ts.dispose();



}

// make html canvases on which individual nodes outputs will be drawn
function make_layers_canvas(){

  // nb of node output image per column
  const cols = 5*node_output_scale;

  const visu_h = 200/node_output_scale;
  const visu_w = 200/node_output_scale;
  const div = $(".network_output").first();
  var c,r,d,h;
  for(i=0;i<model.layers.length;i++){
    d = $("<div class='layer_output'></div>");
    h = $("<p class='layer_n'>Layer "+i+"</p>");
    d.append(h);
    r = $();
    for(j=0;j<model.layers[0].units;j++){
      if(j%cols == 0){
        d.append(r);
        r = $("<tr class='layer_output_row'></tr>");
      }
        c = $("<canvas></canvas>");
      c.attr("class","node_output");
      c.attr("height",visu_h);
      c.attr("width",visu_w);
      r.append(c);
    }
    d.append(r);
    div.append(d);
  }
}
