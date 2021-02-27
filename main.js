// 즉시 실행 함수
// 이 안에서의 변수는 외부에서 접근 x (전역변수 피하기)

(() => {
    const stepElems = document.querySelectorAll('.step');
    const grapicElems = document.querySelectorAll('.graphic-item');

    // 현재 활성화된 visible class가 붙은 .graphic-item
    let currentItem = grapicElems[0];
    let ioIndex;

    // Intersection Observer
    // entries
    // 생성자에 callback 함수를 받음. 
    // callback 함수는 관찰 대상이 사라지거나 나타날 때 호출됨. 
    const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1; // String -> Number로 바꾸기
    });


    for (let i = 0; i < stepElems.length; i++) {
        io.observe(stepElems[i]) // stepElem 가 관찰 대상으로 등록됨
        // stepElems[i].setAttribute('data-index', i);
        stepElems[i].dataset.index = i;
        grapicElems[i].dataset.index = i;
    }

    function activate() {
        currentItem.classList.add('visible');
    }

    function inactivate() {
        currentItem.classList.remove('visible');
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;

        // for (let i = 0; i < stepElems.length; i++) {
        // ioIndex - 1 : 현재 인덱스의 바로 전 거
        for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
            step = stepElems[i];
            
            if(!step) continue;
            boundingRect = step.getBoundingClientRect();

            // getBoundingClientRect 위치, 크기를 반환
            if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
                inactivate();
                currentItem = grapicElems[step.dataset.index];
                activate();
            }
        }
        
    });

    activate();


})();

// 바깥에서 접근x
// console.log(a);