class Timer {
    constructor( durationInput , startButton , pauseButton, callbacks){
        // to use these elements outside the scope of the constructor function they are made to point to the class by 'this'
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        // to make the callbacks arguments optional
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        // add event listener to the start element
        this.startButton.addEventListener('click', this.start); 
        this.pauseButton.addEventListener('click', this.pause); 
        // make a on and off index to make sure that start don't stack when clicked many times
        this.on = false;
    };

    start=() => {
        // make sure that no interval already running to prevent stacking
        if(this.on === false){
            // check if onStart is defiend or not before invoking
                if(this.onStart){
                this.onStart(this.timeRemaining);
            };
            this.tick();
            // tick will run every 20 ms after the start is clicked
            this.interval = setInterval(this.tick,20);
            // ture means it works so even it was pushed again it won't run
            this.on = true;
        };
    };

    pause = () =>{
        clearInterval(this.interval);
        // you can press start again after the counter paused or finished
        this.on = false;
    }

    tick = () => {
        // make sure that timer don't get less than 0
        if (this.timeRemaining <= 0) {
        this.pause();
        // check if onComplete was provided and invoke it when it hits 0
        if(this.onComplete){
            this.onComplete();}
        } else {
        this.timeRemaining -= 0.02;
          // if there is onTick, invoke it
            if(this.onTick){
            this.onTick(this.timeRemaining);
            }
        }
    };
    // getters and setters used to hide all the complexty in the tick function and to add abstraction to it
    get timeRemaining(){
        return parseFloat(this.durationInput.value);
    };
    set timeRemaining(time){
        this.durationInput.value = time.toFixed(2);
    };

}