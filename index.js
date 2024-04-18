// Require the Google Cloud Vision library
const vision = require('@google-cloud/vision');

// Asynchronously analyze an image using Google Cloud Vision API
async function analyzeImage(image){
    try{
        // Initialize the ImageAnnotatorClient with your service account credentials
        const client = new vision.ImageAnnotatorClient({
            keyFilename: 'JSONKEYFILE' // Replace with your actual JSON key file
        });
    
        // Perform label detection on the image to identify objects, locations, activities, and more
        const [labels] = await client.labelDetection(image);
        // Perform safe search detection to determine the likelihood of adult content, violence, etc.
        const [safeSearch] = await client.safeSearchDetection(image);
        // Return the results of both label and safe search detection
        return {labels, safeSearch};
    }catch(error){
        // Log any errors that occur during the API call
        console.error('Error:', error);
    }
}

// Self-invoking anonymous function to use top-level await (since Node.js does not allow await outside async functions)
(async()=>{
    // Call the analyzeImage function with the name of the image file
    const imageAn = await analyzeImage('logo.png');
    // Log the results of the analysis
    console.log(imageAn);
})()
