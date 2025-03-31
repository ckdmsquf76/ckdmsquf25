// 이미지 및 반지름 추가
import { FRUITS } from "./fruits.js";


// 모듈 불러오기

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World;

// 엔진 선언
const engine = Engine.create();

// 렌더 선언
const render = Render.create({
    engine,
    element: document.body,
    options: {
        wireframes: false,
        background: '#ECF2DF',
        width: 620,
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
const rightWall = Bodies.rectangle(605, 395, 30, 790,{
    isStatic: true,
    render: { fillStyle: '#81A687'}
})
const ground = Bodies.rectangle(310, 820, 620, 60,{
    isStatic: true,
    render: { fillStyle: '#81A687'}
})
const topLine = Bodies.rectangle(310, 150, 620, 2,{
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
let currentbody = null;
let currentfruit = null;

//과일 추가 함수
function addFruits() 
{
    //난수 생성
    const index = Math.floor(Math.random() * 5);

    const fruit = FRUITS[index];

    const body = Bodies.circle(300, 50, fruit.radius, 
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
        currentbody = body;
        currentfruit = fruit;

        //월드에 배치
        World.add(world, body);

}
//함수 호출
addFruits();