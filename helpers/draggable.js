export default function draggable(element , [boundryW,boundryH]) {
	let isMouseDown = false;
    let isTouchStart = false;
    // initial mouse X and Y for `mousedown`
    let mouseX;
    let mouseY;

    // initial touch X and Y for `touchstart`
    let touchX;
    let touchY;

    // element X and Y before and after move
    let elementX = 0;
    let elementY = 0;

	// mouse button down over the element
    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('touchstart', onTouchStart);
    
	/**
     * Listens to `mousedown` event.
     *
     * @param {Object} event - The event.
     */
    function onMouseDown(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        isMouseDown = true;
    }

    /**
     * Listens to `touchstart` event.
     *
     * @param {Object} event - The event. 
     */
    function onTouchStart(event) {
        touchX = event.touches[0].clientX;
        touchY = event.touches[0].clientY;
        isTouchStart = true;
    }

	// mouse button released
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onTouchEnd);

	/**
     * Listens to `mouseup` event.
     *
     * @param {Object} event - The event.
     */
	function onMouseUp(event) {
        isMouseDown = false;
        elementX = parseInt(element.style.left) || 0;
        elementY = parseInt(element.style.top) || 0;
    }
    /**
         * Listens to `touchend` event.
         *
         * @param {Object} event - The event.
         */
    function onTouchEnd(event) {
        isTouchStart = false;
        elementX = parseInt(element.style.left) || 0;
        elementY = parseInt(element.style.top) || 0;
    }

	// need to attach to the entire document
    // in order to take full width and height
    // this ensures the element keeps up with the mouse
    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('touchmove', onTouchMove);

    function optimizeBoundries(dx,dy){
        let elementW = element.clientWidth;
        let elementH = element.clientHeight;
        element.style.left = elementX + dx + 'px';
        element.style.top = elementY + dy + 'px';
        if(elementW <= boundryW){
            if(parseInt(element.style.left) < 0){
                element.style.left = 0 + 'px';
            }
            if(parseInt(element.style.left) + elementW > boundryW){
                element.style.left = boundryW - elementW + 'px';
            }
        }
        if(elementW > boundryW){
            if(parseInt(element.style.left) > 0){
                element.style.left = 0 + 'px';
            }
            if(parseInt(element.style.left) + elementW < boundryW){
                element.style.left = boundryW - elementW + 'px';
            }
        }
        if(elementH <= boundryH){
            if(parseInt(element.style.top) < 0){
                element.style.top = 0 + 'px';
            }
            if(parseInt(element.style.top) + elementH > boundryH){
                element.style.top = boundryH - elementH + 'px';
            }
        }
        if(elementH > boundryH){
            if(parseInt(element.style.top) > 0){
                element.style.top = 0 + 'px';
            }
            if(parseInt(element.style.top) + elementH < boundryH){
                element.style.top = boundryH - elementH + 'px';
            }
        }
    }

	/**
     * Listens to `mousemove` event.
     *
     * @param {Object} event - The event.
     */
	function onMouseMove(event) {
    	if (!isMouseDown) return;
        let dx = event.clientX - mouseX;
        let dy = event.clientY - mouseY;
        optimizeBoundries(dx,dy);
    }
    
	/**
     * Listens to `mousemove` event.
     *
     * @param {Object} event - The event.
     */
	function onTouchMove(event) {
        event.preventDefault();
        if (!isTouchStart) return;
        let dx = event.touches[0].clientX - touchX;
        let dy = event.touches[0].clientY - touchY;
        optimizeBoundries(dx,dy);
    }
}