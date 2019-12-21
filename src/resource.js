var folder = "";

if (!cc.sys.isNative)
{
    folder = "res/mediumRes/";
}

var res = {
    HelloWorld_png : folder + "HelloWorld.png",
    CloseNormal_png : folder + "CloseNormal.png",
    CloseSelected_png : folder+ "CloseSelected.png",
    Background_png : folder+ "background.png",
    BrownEgg_png : folder+ "egg-brown.png",
    GreenEgg_png : folder+ "egg-green.png",
    Basket_png : folder+ "basket1.png",
    Floor_png : folder+ "floor.png",
    CrackedEgg_png : folder+ "cracked_egg.png",
    GameOver_jpg : folder+ "gameOver.jpg"

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}