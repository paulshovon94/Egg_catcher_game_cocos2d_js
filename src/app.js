var spEggs = [];
var score, life, labelScoreValue, labelLifeValue;
var floorHeight = 50;
var score = 0;
var life = 3;

var HelloWorldLayer = cc.Layer.extend({
    sprite: null,

    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        this.init();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        // var size = cc.winSize;

        // var sprite = new cc.Sprite.create(res.Background_png);
        // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        // sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        // this.addChild(sprite, 0);

        // var sprite = new cc.Sprite.create(res.BrownEgg_png);
        // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        // sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        // this.addChild(sprite, 0);

        // var sprite = new cc.Sprite.create(res.Basket_png);
        // sprite.setPosition(cc.p(0, 0));
        // sprite.setAnchorPoint(cc.p(0, 0));
        // this.addChild(sprite, 0);

        return true;
    },

    init: function () {
        this._super();
        var size = cc.winSize;
        //Background Image
        var sprite = new cc.Sprite.create(res.Background_png);
        sprite.setAnchorPoint(cc.p(0.5, 0.5));
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(sprite, 0);
        //Floor Image
        var sprite = new cc.Sprite.create(res.Floor_png);
        sprite.setPosition(cc.p(0, 0));
        sprite.setAnchorPoint(cc.p(0, 0));
        this.addChild(sprite, 10);
        //Egg
        // var speedTimer =0.05; 
        // speedTimer= speedTimer* this.schedule(this.multi, .01);
        
        this.createEgg();
        this.schedule(this.createEgg, 2);
        this.schedule(this.dropEgg,0.05);
        //Lable Score
        // score = 0;
        // life = 3;
        var labelScore = new cc.LabelTTF("Score: ", "Arial", 40);
        labelScore.setAnchorPoint(cc.p(0.0, 0.5));
        labelScore.setPosition(cc.p(size.width * 7 / 10, size.height * 9 / 10));
        labelScore.setColor(cc.color(255, 255, 255));
        this.addChild(labelScore);
        //Score entry
        labelScoreValue = new cc.LabelTTF(score.toString(), "Arial", 40);
        labelScoreValue.setAnchorPoint(cc.p(0.0, 0.5));
        labelScoreValue.setPosition(cc.p((size.width * 4 / 5) + 60, size.height * 9 / 10));
        labelScoreValue.setColor(cc.color(255, 255, 255));
        this.addChild(labelScoreValue);
        //Label life
        var labelLife = new cc.LabelTTF("Life: ", "Arial", 40);
        labelLife.setAnchorPoint(cc.p(0.0, 0.5));
        labelLife.setPosition(cc.p(size.width * 7 / 10, (size.height * 9 / 10) - 50));
        labelLife.setColor(cc.color(255, 255, 255));
        this.addChild(labelLife);
        //Life remaining
        labelLifeValue = new cc.LabelTTF(life.toString(), "Arial", 40);
        labelLifeValue.setAnchorPoint(cc.p(0.0, 0.5));
        labelLifeValue.setPosition(cc.p((size.width * 4 / 5) + 60, (size.height * 9 / 10) - 50));
        labelLifeValue.setColor(cc.color(255, 255, 255));
        this.addChild(labelLifeValue);
        //Basket
        this._basket = new cc.Sprite.create(res.Basket_png);
        this._basket.setPosition(cc.p(0, 0));
        this._basket.setAnchorPoint(cc.p(0, 0));
        this.addChild(this._basket, 9);
    },

    //Touch  Detection
    onEnter: function () {
        this._super();
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
    },
    //Touch Begain
    onTouchBegan: function (touch, event) {
        var tp = touch.getLocation();
        var tar = event.getCurrentTarget();
        //tar._basket.setPosition(tp.x,0)
        //console.log('onTouchBegan:' + tp.x.toFixed(2) + ',' + tp.y.toFixed(2));
        //console.log('_basket.position:' + tar._basket.x.toFixed(2) + ','  + tar._basket.y.toFixed(2));
        //console.log('_basket.height' + tar._basket.height);
        return true;
    },
    //Touch Moved
    onTouchMoved: function (touch, event) {
        var tp = touch.getLocation();
        var tar = event.getCurrentTarget();
        tar._basket.setPosition(tp.x, 0)
        //_basket.setPosition( touch.getLocationX( ), touch.getLocationY( ) );
        //console.log('onTouchMoved:' + tp.x.toFixed(2) + ',' + tp.y.toFixed(2));

    },
    //Touch Ended
    onTouchEnded: function (touch, event) {
        var tp = touch.getLocation();
        //console.log('onTouchEnded:' + tp.x.toFixed(2) + ',' + tp.y.toFixed(2));
    },
    // // speed increaser
    // multi: function (dt) {
    //     var m = score / 5;
    //     if (m > 1) {
    //         console.log(1/m);
    //         return 1/m;
    //     }
    //     return 1;
    // },
    //Creating eggs and pushing to array
    createEgg: function (dt) {
        //cc.log("Enter CreateEgg.");
        var size = cc.winSize;
        spEgg = new cc.Sprite(res.BrownEgg_png);
        var posX = Math.random() * size.width;
        spEgg.setPosition(cc.p(posX, size.height - 10));
        spEggs.push(spEgg);
        this.addChild(spEgg, 0);
    },
    //Dropping eggs from sky
    dropEgg: function (dt) {
        for (var i = 0; i < spEggs.length; i++) {
            var y = spEggs[i].getPositionY();
            //var x = spEggs[i].getPositionX();
            //spEggs[i].setPositionX(x - 5);
            spEggs[i].setPositionY(y - 5);

            if (this.catchEgg(spEggs[i])) {
                //cc.log("Score: "+ (++score));
                labelScoreValue.setString((++score).toString());
                var sprite_action = cc.FadeOut.create(0.5);
                spEggs[i].runAction(sprite_action);
                //this.removeChild(spEggs[i]);
                spEggs.splice(i, 1);
            }
            if (this.fallenEgg(spEggs[i])) {
                //cc.log("Life: "+ (--life));
                labelLifeValue.setString((--life).toString());
                this.crackEgg(spEggs[i]);
                spEggs.splice(i, 1);
                if (life <= 0) {
                    this.gameOver();
                }
            }
        }
    },
    //Game Over function called if there is no life
    gameOver: function () {
        var spBackground = new cc.Sprite(res.GameOver_jpg);
        size = cc.winSize;
        spBackgroundSize = spBackground.getContentSize();
        spBackground.setAnchorPoint(cc.p(0.5, 0.5));
        spBackground.setPosition(cc.p(size.width / 2, size.height / 2));
        spBackground.scaleY = size.height / spBackgroundSize.height;
        spBackground.scaleX = size.width / spBackgroundSize.width;
        this.addChild(spBackground, 30);
    },
    //If touches floor then a cracked image is inserted
    crackEgg: function (egg) {
        this.removeChild(egg);
        var spEggCrack = new cc.Sprite(res.CrackedEgg_png);
        spEggCrack.setAnchorPoint(cc.p(0.5, 0.5));
        spEggCrack.setPosition(cc.p(egg.getPositionX(), floorHeight));
        this.addChild(spEggCrack, 11);
        var sprite_action = cc.FadeOut.create(10);
        spEggCrack.runAction(sprite_action);
    },
    //Checking if it touches floor or not
    fallenEgg: function (egg) {
        if (egg.getPositionY() <= floorHeight) {
            return true;
        }
        return false;
    },
    //Checks if Basket caches egges or not
    catchEgg: function (egg) {
        //return false;
        //this._super();
        // var manager = cc.director.getCollisionManager();
        // manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
        var rectA = egg.getBoundingBox();
        var rectB = this._basket.getBoundingBox();
        rectA.width -= 25;
        rectB.height -= 25;
        rectB.width -= 25;

        if (cc.rectIntersectsRect(rectA, rectB)) {
            console.log("collided");
            return true;
        }
        return false;
    }

});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

