class Ship
{
    constructor(x, y) 
    {
        if (this.constructor.name === 'Ship') 
        {
            throw new Error(`${this.constructor.name}: can not create instance of abstract class`);
        }
        this.x = x;
        this.y = y;
        this.speed = 25;
        this.direction = 0;
    }
}
class HeroShip extends Ship
{
    constructor(x, y)
    {
        super(x, y)
        // this.width = 14;
        // this.height = 30;
        this.img = new Image();
        this.img.src = "/src/img/Starships/Hero_Ship.png";
        
        this.up = document.getElementsByClassName("ArrowUp")[0];
        this.left = document.getElementsByClassName("ArrowLeft")[0];
        this.shoot = document.getElementsByClassName("btnShoot")[0];
        this.right = document.getElementsByClassName("ArrowRight")[0];
        this.down = document.getElementsByClassName("ArrowDown")[0];
    }
    reDraw(context)
    {
        context.drawImage(this.img, this.x, this.y);
        context.imageSmoothingEnabled = false;
    }
    defDirection(canvas, dt)
    {
        if((this.direction === 1) && (this.y > 0 ))
        {
            this.y = this.y - (this.speed * dt);
        }
        else if((this.direction === 2) && (this.x > 0)) 
        {
            this.x = this.x - (this.speed * dt);
        }
        else if((this.direction === 3) && (this.x < canvas.width)) 
        {
            this.x = this.x + (this.speed * dt);
        }
        else if((this.direction === 4) && (this.y < canvas.height)) 
        { 
            this.y = this.y + (this.speed * dt);
        }
        // else 
        // {
        //     this.y = this.y + (this.speed * dt * 0.0001);
        // }
    }
}
class EnemyShip extends Ship
{
    constructor(x, y)
    {
        super(x, y)
        this.img = new Image();
        this.ind = getRandomNum(1, 4);
        this.img.src = `/src/img/Starships/Enemy_Ship_${this.ind}.png`;

    }
    reDraw(context)
    {
        context.drawImage(this.img, this.x, this.y);
        context.imageSmoothingEnabled = false;
    }
    // behavior()
    // {
    //     if (this.ind == 1)
    //     {
    //         this.ind = this.ind;
    //     }
    //     else if (ind == 2)
    //     {
    //         this.ind = this.ind;
    //     }
    //     else if (ind == 3)
    //     {
    //         this.ind = this.ind;
    //     }
    //     else if (ind == 4)
    //     {
    //         this.ind = this.ind;
    //     }
    // }
    generatePos(canvas)
    {
        this.x = getRandomNum(0, Math.floor(canvas.width - this.img.naturalWidth)); //
        this.y = 0 - this.img.naturalHeight;
    }
    
}

function getRandomNum(left, right)
{
    return Math.floor(Math.random() * (right - left + 1) + left);
}

function createEnemies(canvas, len)
{
    var enemies = new Array();
    for (let i = 0; i < len; i++)
    {
        enemies[i] = new EnemyShip(0, 0);
        enemies[i].generatePos(canvas);
    }
    return enemies;
}

function drawAllEnemies(context, dt, mtrx)
{
    for (let i = 0; i < mtrx.length; i++)
    {
        for (let j = 1; j < mtrx[i].length; j++)
        {
            // the place for behavior
            mtrx[i][j].reDraw(context);
            mtrx[i][j].y = mtrx[i][j].y + (mtrx[i][j].speed * dt);
            
        }
    }
}

document.addEventListener('DOMContentLoaded', () => 
{
    var canvas = document.getElementById("canvas");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    var context = canvas.getContext("2d");
    var now = Date.now();
    var timeSpawnPassed = 5000;
    var mtrx = new Array();
    
    // up.addEventListener("mouseup", () => 
    // {
    //     dir = 
    // });
    document.querySelector(".btnStart").addEventListener("click", () =>
    {
        function draw()
        {
            context.clearRect(0, 0, canvas.width, canvas.height);
            var dt = (Date.now() - now) / 1000;
            now = Date.now();
            if (timeSpawnPassed >= 5)
            {
                var len = getRandomNum(2, 4);
                mtrx.push(createEnemies(canvas, len));
                timeSpawnPassed = 0;
            }
            timeSpawnPassed += dt;
            hero.reDraw(context);
            drawAllEnemies(context, dt, mtrx);

            hero.defDirection(canvas, dt);
            
            requestAnimationFrame(draw);
        }
        document.querySelector(".btnStart").style.display = "none";
        document.getElementById("handling").style.display = "flex";
        document.getElementsByClassName("content")[0].style.filter = "none";
        var hero = new HeroShip((canvas.width / 2), (canvas.height / 2));

        console.log(`w: ${hero.img.naturalWidth} h: ${hero.img.naturalHeight}`);

        hero.up.addEventListener("mousedown", () =>
        {
            hero.direction = 1;
        });
        hero.left.addEventListener("mousedown", () =>
        {
            hero.direction = 2;
        });
        // hero.shoot.addEventListener("mousedown", () =>
        // {
        //     // hero.direction = 1;
        // });
        hero.right.addEventListener("mousedown", () =>
        {
            hero.direction = 3;
        });
        hero.down.addEventListener("mousedown", () =>
        {
            hero.direction = 4;
        });

        hero.up.addEventListener("mouseup", () =>
        {
            hero.direction = 0;
        });
        hero.left.addEventListener("mouseup", () =>
        {
            hero.direction = 0;
        });
        // hero.shoot.addEventListener("mouseup", () =>
        // {
        //     // hero.direction = 1;
        // });
        hero.right.addEventListener("mouseup", () =>
        {
            hero.direction = 0;
        });
        hero.down.addEventListener("mouseup", () =>
        {
            hero.direction = 0;
        });
        draw();
    });
    console.log(getRandomNum(1, 4));
});