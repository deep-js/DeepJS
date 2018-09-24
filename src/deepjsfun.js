

/* TODO:
 * - make it faster
 * - more accurate 
 * - consistent start (avoid starting at loss = 0.8 and a color missing etc.)
 * - clean the code : split it in functions, put in good variable names
 * - asynchronous image updates (if even possible) : update the image without stopping the learning process
 * - display loss chart, make a nice tab for loss values etc
 * - interactivity : model layout inputed in a form, some sliders/forms for batch size etc, training has to be restarted when those settings are tweaked. A learning rate slider, possibly without reloading the model
 */

// original image
img = new Image;
img.src = "img/kitty.jpg";

const w = 200;
const h = 200;

// to get raw image data
const canvas = document.getElementById("orig");
const ctx = canvas.getContext("2d");

var model;//, imageData;
var imageData;

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

make_config_forms();

img.onload = () => {
  // image is loaded

  ctx.drawImage(img, 0, 0);
  imageData = ctx.getImageData(0, 0, w,h);
  train(imageData);
}

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

  eval($("#model_config").val());

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
    onEpochEnd: (epoch, logs) => {

      update_loss_chart(epoch,logs.loss);

      update_metrics({epoch: epoch, batch: logs.batch, loss: logs.loss});

      // every 3 epoch, update the result image
      if(epoch%2 != 0 && epoch > 0)
        return;

      model_output = get_model_output(txs);

      draw_image(model_output, document.getElementById("result"));
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

function make_config_forms(){
  model_def = " // Define a model for linear regression.\n\
  model = tf.sequential();\n\
  // model layout is similar ConvNetJs' model \n\
  // 2 inputs : x,y \n\
  model.add(tf.layers.dense({units: 20, inputShape: [2], activation: 'relu', kernelInitializer: 'varianceScaling'}));\n\
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: 'varianceScaling'}));\n\
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: 'varianceScaling'}));\n\
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: 'varianceScaling'}));\n\
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: 'varianceScaling'}));\n\
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: 'varianceScaling'}));\n\
  model.add(tf.layers.dense({units: 3, activation: 'relu', kernelInitializer: 'varianceScaling'}));\n\
  // 3 outputs : rgb \n\
  \n\
  BATCH_SIZE = 250;\n\
  // did not tinker much with that \n\
  const LEARNING_RATE = 0.1;\n\
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

  // for some reason a canvas only takes 4 channel images
  // so the Alpha channel has to be inserted
  // this is hugely inefficient
  // Chrome takes ~0.5s 
  // Firefox takes ~2s and complains about the script being frozen 
  for(i=3;i<data.length+1;i+=4){
    data.splice(i,0,255);
  }

  // ImageData must be constructed using this typed array
  data = Uint8ClampedArray.from(data);
  imagedata = new ImageData(data,w,h);



  // trickery to draw the image on the canvas
  // ref : https://stackoverflow.com/questions/24236470/html5-can-i-create-an-image-object-from-an-imagedata-object
  var tmpcanvas = document.createElement('canvas');
  var tmpctx = tmpcanvas.getContext('2d');
  tmpcanvas.width = canvas.width;
  tmpcanvas.height = canvas.height;
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
  img_out = img_out.mul(tf.scalar(255));
  img_out = tf.cast(img_out,'int32');

  // actually request the data (model.predict gives a promise)
  return Array.from(img_out.dataSync());
}

function update_metrics(metrics){
  // print epoch number inside tag having id #epoch
  typeof metrics.epoch !== 'undefined' && ($('#epoch_info')[0].innerHTML=metrics.epoch);
  typeof metrics.batch !== 'undefined' && ($('#batch_info')[0].innerHTML=metrics.batch);
  typeof metrics.loss !== 'undefined' && ($('#loss_info')[0].innerHTML=metrics.loss);
}
