const matterContainer = document.querySelector("#matter-container");
const addButton = document.querySelector("#add-logo");
const THICNESS = 60

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: matterContainer, //document.body (targets the body element)
    engine: engine,
    options: {
        width: matterContainer.clientWidth,
        height: matterContainer.clientHeight,
        background: "transparent",
        wireframes: false,
        showAngleIndicator: false
    }
});

const createObject = () => {
    let logo = Bodies.rectangle(matterContainer.clientWidth / 2, 0, 300, 120,{
        render: {
            sprite: {
                texture: "images/icons/rex-design-logo.png"
            }
        },
        friction: 0.3, 
        frictionAir: 0.00001, 
        restitution: 0.4
    });
    Composite.add(engine.world, logo);
}

// create a ground
var ground = Bodies.rectangle(
    matterContainer.clientWidth / 2, 
    matterContainer.clientHeight + THICNESS / 2, 
    27184, 
    THICNESS, 
    { 
        isStatic: true,
        render: {
            fillStyle: 0
        }
    });
// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var boxB = Bodies.rectangle(450, 50, 80, 80);

// create circles
// for (let i = 0; i < 20; i++) {
//     let circle = Bodies.circle(i, 10, 30, {
//         friction: 0.3, 
//         frictionAir: 0.00001, 
//         restitution: 0.8
//     });
//     // add circles to the world
//     Composite.add(engine.world, circle);
// }

let leftWall = Bodies.rectangle(
    0 - THICNESS / 2,
    matterContainer.clientHeight / 2,
    THICNESS,
    matterContainer.clientHeight * 5,
    {
        isStatic: true,
        render: {
            fillStyle: 0
        }
    }
);

let rightWall = Bodies.rectangle(
    matterContainer.clientWidth + THICNESS / 2,
    matterContainer.clientHeight / 2,
    THICNESS, 
    matterContainer.clientHeight * 5,
    { 
        isStatic: true,
        render: {
            fillStyle: 0
        }
    }
);

// add all of the bodies to the world
Composite.add(engine.world, [ground, leftWall, rightWall]); //boxA boxB

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

// add the mouse constraint to the world
Composite.add(engine.world, mouseConstraint);

// allow to scroll through canvas
mouseConstraint.mouse.element.removeEventListener(
    "wheel",
    mouseConstraint.mouse.mousewheel
);
mouseConstraint.mouse.element.removeEventListener(
    "DOMMouseScroll",
    mouseConstraint.mouse.mousewheel
);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

addButton.addEventListener("click", createObject)


function handleResize(matterContainer) {
    // set canvas size to new values when resizing the page for responsiveness
    render.canvas.width = matterContainer.clientWidth;
    render.canvas.height = matterContainer.clientHeight;

    // reposition ground
    Matter.Body.setPosition(
        ground,
        Matter.Vector.create(
            matterContainer.clientWidth / 2,
            matterContainer.clientHeight + THICNESS / 2
        )
    );

    // reposition right wall
    Matter.Body.setPosition(
        rightWall,
        Matter.Vector.create(
            matterContainer.clientWidth + THICNESS / 2,
            matterContainer.clientHeight / 2
        )
    );
}

window.addEventListener("resize", () => handleResize(matterContainer));