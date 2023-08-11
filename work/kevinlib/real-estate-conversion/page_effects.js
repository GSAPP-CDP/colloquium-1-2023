document.addEventListener("DOMContentLoaded", function() {
    const scroller = scrollama();

    scroller.setup({
        step: '#fadeSection',
        offset: 0.1, // Triggers fade-in when section reaches middle of viewport
        debug: false // Shows trigger lines; remove or set to false for production
    })
    .onStepEnter(response => {
        // Check if it's the fadeSection
        if(response.element.id === 'fadeSection') {
            setTimeout(() => {
                response.element.classList.remove('opacity-0');
                response.element.classList.add('opacity-100');
            }, 100);  // Delay of 1 second (1000 milliseconds)
        }
    })
    .onStepExit(response => {
    });
});
