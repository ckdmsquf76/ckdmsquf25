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
        background: '#F7F4C8',
        width: 620,
        height: 850,
    }
});

// 벽 배치 월드 선언
const world = engine.world;

// 벽 생성
const leftWall = Bodies.rectangle(15, 295, 30, 790,{
    isStatic: true,
    render: { fillStyle: '#E6B143'}
})

//생성한 벽 월드에 배치
World.add(world, [leftWall]);

// 실행
Render.run(render);
Runner.run(engine);