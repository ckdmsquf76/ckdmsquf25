// 이미지 및 반지름 추가
import { FRUITS } from "./fruits.js";

// 1 이미지 미리 불러오는 작업
const loadTexture = async () => {

    const textureList = [
    'image/00_cherry.png',
    'image/01_strawberry.png',
    'image/02_grape.png',
    'image/03_gyool.png',
    'image/04_orange.png',
    'image/05_apple.png',
    'image/06_pear.png',
    'image/07_peach.png',
    'image/08_pineapple.png',
    'image/09_melon.png',
    'image/10_watermelon.png',
    ]
    
    const load = textureUrl => {
    const reader = new FileReader()
    
    return new Promise( resolve => {
    reader.onloadend = ev => {
    resolve(ev.target.result)
    }
    fetch(textureUrl).then( res => {
    res.blob().then( blob => {
    reader.readAsDataURL(blob)
    })
    })
    })
    }
    
    const ret = {}
    
    for ( let i = 0; i < textureList.length; i++ ) {
    ret[textureList[i]] = await load(`${textureList[i]}`)
    }
    
    return ret
    }
    
    const textureMap = await loadTexture()

// 모듈 불러오기

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World, 
    Body = Matter.Body, //바디 추가 
    Events = Matter.Events; // Events 추가

// 엔진 선언
const engine = Engine.create();

// 렌더 선언
const render = Render.create({
    engine,
    element: document.body,
    options: {
        wireframes: false,
        background: '#ECF2DF',
        width: 520,
        height: 850,
    }
});

// 벽 배치 월드 선언
const world = engine.world;

// 벽 생성
const leftWall = Bodies.rectangle(15, 395, 30, 790,{
    isStatic: true,
    render: { fillStyle: '#81A687'}
})
const rightWall = Bodies.rectangle(505, 395, 30, 790,{
    isStatic: true,
    render: { fillStyle: '#81A687'}
})
const ground = Bodies.rectangle(310, 820, 620, 60,{
    isStatic: true,
    render: { fillStyle: '#81A687'}
})
const topLine = Bodies.rectangle(310, 150, 620, 2,{

    //이벤트 처리 이름 지정
    name : "topLine",
    isStatic: true,
    //센서 감지 기능 충돌 안함
    isSensor: true,
    render: { fillStyle: '#3C593B'}
})

//생성한 벽 월드에 배치
World.add(world, [leftWall, rightWall, ground, topLine]);

// 실행
Render.run(render);
Runner.run(engine);

//현재 과일 값을 저장하는 변수
let currentBody = null;
let currentFruit = null;

//키 조작 제어 변수
let disableAction = false;

//키 제어 변수
let interval = null;

//과일 추가 함수
function addFruits() 
{
    //난수 생성
    const index = Math.floor(Math.random() * 5);

    const fruit = FRUITS[index];

    const body = Bodies.circle(250, 50, fruit.radius, 
        {
            // 해당 과일의 번호값를 저장
            index : index,
            // 처음 시작때 멈춰있음
            isSleeping : true,
            render: {
                sprite: {texture: `${fruit.name}.png`}
            },
            restitution: 0.4,
        });

        //현재 과일 값 저장
        currentBody = body;
        currentFruit = fruit;

        //월드에 배치
        World.add(world, body);

}

//키보드 입력 받기
window.onkeydown = (event) => 
{
    if(disableAction)
        return;
    switch(event.code) 
    {
        case "KeyA":
            // 한번 누르면 계속 작동하는걸 제어하기 위한 if
            if(interval)
                return;

            interval = setInterval(() => {
                if(currentBody.position.x - currentFruit.radius > 30 ) {
                    Body.setPosition(currentBody, {
                        x: currentBody.position.x - 1,
                        y: currentBody.position.y ,
                    })
                }
            }, 5);
            break;
        case "KeyD":
            if(interval)
                return;
                interval = setInterval(() => {
                    if(currentBody.position.x + currentFruit.radius < 490 ) {
                        Body.setPosition(currentBody, {
                            x: currentBody.position.x + 1,
                            y: currentBody.position.y ,
                        })
                    }
                }, 5);
            break;
        case "Space":
            currentBody.isSleeping = false;  
            // addFruit()
            disableAction = true;
            //지연 시키는 함수
            setTimeout(()=> {
                addFruits();
                disableAction = false;
            }, 500);
            break;         
    }
}

//인터벌 제어
window.onkeyup = (event) => {
    switch(event.code) {
        case "KeyA":
        case "KeyD":
            clearInterval(interval);
            interval = null;
    }
}

Events.on(engine, "collisionStart", (event) => {

    event.pairs.forEach((collision) => {
        //같은 과일일 경우
        if( collision.bodyA.index == collision.bodyB.index )
        {
            //지우기 전 해당 과일 값을 저장.
            const index = collision.bodyA.index;

            // 수박일 경우에 처리하지 않음
            if ( index == FRUITS.length - 1)
                return;

            World.remove(world, [collision.bodyA, collision.bodyB]);
            
            //다음 단계 과일 생성
            const newFruit = FRUITS[index +1];
            const newBody = Bodies.circle(
                collision.collision.supports[0].x, 
                collision.collision.supports[0].y,
                newFruit.radius,{
                    //과일 값 1 증가
                    index : index + 1,
                    //새로운 과일 렌더
                    render: { sprite: {texture: `${newFruit.name}.png`} },
                }
            );
            
            //새로 만든 과일 추가
            World.add(world, newBody);

            //게임 승리 조건
            if(newBody.index === 10){
                
                setTimeout(() => {
                    alert("wow you did it, mate. you made the watermelon!\nbloody hell. congratulation!");
                disableAction = true;
                }, 1000)
            }
        
        }

        //게임 종료 조건 이벤트 생성
        if( !disableAction && (collision.bodyA.name === "topLine" || collision.bodyB.name === "topLine") ){
             alert("game over");
             disableAction == true;
        }
    })
})

//함수 호출
addFruits();