// Immediately Invoked Function Expression (IIFE). create a separate scope for your code. Variables declared inside the IIFE are not accessible from outside, which helps prevent polluting the global scope and potential conflicts with other scripts. IIFE's are commonly used in JavaScript for encapsulating code, avoiding naming conflicts, and creating modules with private variables.


(() => {     //arrow function declaraion. defines anonymous funtion with out a name. 
    let youtubeLeftControls, youtubePlayer;
})();       //the () invokes or calls the arrow function immediately after it is defined.