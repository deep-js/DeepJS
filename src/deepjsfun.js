

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
img.src = "img/lena.jpg";

const w= 200;
const h= 200;

// to get raw image data
const canvas = document.getElementById("orig");
const ctx = canvas.getContext("2d");


var plotctx = document.getElementById("plot");

var lossdata = {
  labels: [],
  datasets:[{
    label: 'loss',
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

  }
} 
//var data = [{x:0, y:1},{x:1, y:2},{x:2, y:3},{x:3, y:4}];

var losschart = new Chart(plotctx, {
    type: 'line',
    data: lossdata,
    options:options
});

img.onload = () => {
  // image is loaded

  ctx.drawImage(img, 0, 0);
  imageData = ctx.getImageData(0, 0, w,h);
  train(imageData);
}


function train(imageData) {

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

  // Define a model for linear regression.
  const model = tf.sequential();
  // model layout is similar ConvNetJs' model
  // 2 inputs : x,y
  model.add(tf.layers.dense({units: 20, inputShape: [2], activation: 'relu', kernelInitializer: 'varianceScaling'}));
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: 'varianceScaling'}));
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: 'varianceScaling'}));
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: 'varianceScaling'}));
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: 'varianceScaling'}));
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: 'varianceScaling'}));
  model.add(tf.layers.dense({units: 3, activation: 'relu', kernelInitializer: 'varianceScaling'}));
  // 3 outputs : rgb

  // did not tinker much with that
  const LEARNING_RATE = 0.1;

  // ConvNetJS has a momentum variable, so the optimizer was chosen accordingly
  const MOMENTUM = 0.9;
  const optimizer = tf.train.momentum(LEARNING_RATE,MOMENTUM);

  // Prepare the model for training: Specify the loss and the optimizer.
  model.compile({loss: 'meanSquaredError', optimizer: optimizer});

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
  model.fit(txs, tys, { batchSize: 250, epochs: 4000, validationSplit: 0, shuffle: true,callbacks: {
    onTrainBegin: async () => {
      console.log("onTrainBegin")
    },
    onTrainEnd: async (epoch, logs) => {
      console.log("onTrainEnd" + epoch + JSON.stringify(logs))
    },
    onEpochBegin: async (epoch, logs) => {
      console.log("onEpochBegin" + epoch + JSON.stringify(logs))
    },
    onEpochEnd: (epoch, logs) => {
      console.log("onEpochEnd" + epoch + JSON.stringify(logs))
      
      console.log("loss" + logs.loss);

      losschart.data.labels.push(epoch);
      losschart.data.datasets[0].data.push(logs.loss);
      losschart.update();

      // print epoch number inside tag having id #epoch
      $('#epoch')[0].innerHTML=epoch;

      // every 3 epoch, update the result image
      if(epoch%1 != 0 && epoch > 0)
        return;

      // get the model outputs for all pixel coordinates
      img_out = model.predict(txs, {batchSize: 1000, verbose: true});//);

      // reformat it to bytes
      img_out = img_out.mul(tf.scalar(255));
      img_out = tf.cast(img_out,'int32');

      // actually request the data (model.predict gives a promise)
      img_out_data = Array.from(img_out.dataSync());

      // for some reason a canvas only takes 4 channel images
      // so the Alpha channel has to be inserted
      // this is hugely inefficient
      // Chrome takes ~0.5s 
      // Firefox takes ~2s and complains about the script being frozen 
      for(i=3;i<img_out_data.length+1;i+=4){
        img_out_data.splice(i,0,255);
      }

      // ImageData must be constructed using this typed array
      img_out_data = Uint8ClampedArray.from(img_out_data);
      imagedata = new ImageData(img_out_data,w,h);


      // get result canvas
      const canvas = document.getElementById("result");
      const ctx = canvas.getContext("2d");

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
    },
    onBatchBegin: async (epoch, logs) => {
      //    console.log("onBatchBegin" + epoch + JSON.stringify(logs))
    },
    onBatchEnd: async (epoch, logs) => {
      // print log infos (loss etc) in the tag having id #epoch
      $('#loss')[0].innerHTML=JSON.stringify(logs);
    }
  }
  }).then(() => {
    console.log("done")
  });
}
