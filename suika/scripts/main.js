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
    isStatic: false,
    render: { fillStyle: '#81A687'}
})
const topLine = Bodies.rectangle(310, 150, 620, 2,{
    isStatic: true,
    render: { fillStyle: '#3C593B'}
})

//생성한 벽 월드에 배치
World.add(world, [leftWall, rightWall, ground, topLine]);

// 실행
Render.run(render);
Runner.run(engine);