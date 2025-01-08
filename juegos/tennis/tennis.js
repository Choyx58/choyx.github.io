var useImages=1;
var canvas=document.getElementById("game");
var ctx=canvas.getContext("2d");
if (window.innerWidth<770) {
	ctx.canvas.width=window.innerWidth;
	ctx.canvas.height=window.innerWidth*5/8
}
var scaleOverall=canvas.width/800
var widthFull=ctx.canvas.width
var panelFraction=0
var controlsFraction=0.35
var panelWidth=panelFraction*widthFull
var controlsHeight=controlsFraction*canvas.height
var screenWidth=(1-panelFraction)*widthFull
var screenHeight=(1-controlsFraction)*canvas.height
var nPersist=300
var nOversample=3
let xpos = new Array(nPersist).fill(0)
let ypos = new Array(nPersist).fill(0)
let spotBrights = new Array(nPersist).fill(0)
let spotSizes = new Array(nPersist).fill(0)
let spotTimes = new Array(nPersist).fill(0)
var intervalTime=28
var fadeScale1=75
var fadeScale2=350
var ballImage=new Array(2)
var interval=0

// Parameters
var x=0
var y=0
var vx=0
var vy=0
var x_old=0
var y_old=0
var computerPosition=0
var ballAngle=0

// Constants
var ballRadius = 4;
var g=0.12
var RCoeff=0.8;
var airCoeff=0.00095;
var ballDisplaySize=2
var vHit=10
var reactionTime=750
var coeffAIX=0
var coeffAIY=Math.PI/8
var computerServeWaitTime=600
var ballAngleTime=40
var ballScaleFactor=1.0
var scaleChangeTime=100
ballInterval=setInterval(changeBallAngle,ballAngleTime)
scaleInterval=setInterval(changeBallScaleFactor,scaleChangeTime)

// Court dimensions
var courtWidth=screenWidth*0.7
var netHeight=courtWidth*0.07
var groundY=0.8*screenHeight
var netX=panelWidth+screenWidth/2

// On-off switch
var switchDisplaySize=0.5
var switchX=0.97*widthFull
var switchY=screenHeight+0.25*controlsHeight

// Buttons
var buttonX=[0.375*widthFull,0.875*widthFull]
var buttonY=[canvas.height-controlsHeight/2,canvas.height-controlsHeight/2]
var buttonActive=new Array(buttonX.length).fill(0)
var buttonDistance=new Array(buttonX.length).fill(0)
var buttonDisplaySize=new Array(buttonX.length).fill(0.6)

// Labels
var labelText=['2P','CPU']
var labelX=[widthFull*0.95,widthFull*0.95]
var labelY=[screenHeight+0.17*controlsHeight,screenHeight+0.37*controlsHeight]
var labelSize=['16','16']
var labelSize2=['14','14']
var labelColor=new Array(labelX.length).fill('black')

// Knobs
var knobX=[0.15*canvas.width,0.65*canvas.width]
var knobY=[screenHeight+controlsHeight/2,screenHeight+controlsHeight/2]
let knobAngle = [0,0]
let knobActive = new Array(knobX.length).fill(0)
let knobNominal = [0,0]
let knobDisplaySize = new Array(knobX.length).fill(0.65)
let knobFactor = [1,1]
var knobZero=[0,0]
var knobImageAngle=0
var knobSensitivity = new Array(knobX.length).fill(0.01)
var knobAngleMin = [-Math.PI/2,-Math.PI/2]
var knobAngleMax = [Math.PI/2,Math.PI/2]
var angleLimits=[Math.PI/4,Math.PI/2]
var knobAngleIncrement=Math.PI/32

// States
var switchState=0
startedGame=0
var buttonState=new Array(buttonX.length).fill(0)
var courtHit=0
var playerServe=2
var ballVisible=0;
var ballHit=0
var netHit=0
var ballActive=0;
var touchLifted=1;
var shownElement=0;

// Sizes
var ballSize=new Array(2)
ballSize[0]=[19,17]
ballSize[1]=[2,2]
var switchSize=[45,112]
var buttonSize=[93,103]
var courtSize=[167,13]
var knobSize=[163,163]
var frameSize=[547,465]
var panelSize=[400,175]

//Click Distances
var knobClickDistance=knobSize[0]*knobDisplaySize[0]/2*scaleOverall
var buttonClickDistance=buttonSize[0]*scaleOverall*buttonDisplaySize[0]
var switchClickDistance=switchSize[0]*scaleOverall*switchDisplaySize

//Sounds
shotNoises=new Array(6)
shotNoises[0]=new Audio('https://drive.google.com/uc?export=download&id=1NztHEAzBUD3yA4-ploC7nY1BLIvXPrjs')
shotNoises[1]=new Audio('https://drive.google.com/uc?export=download&id=1Z2G2_Do55PZxPav4-fbKa51MmBm1YpTx')
shotNoises[2]=new Audio('https://drive.google.com/uc?export=download&id=1eoJSRsJpG4QcCoTV4h4HZPFIgeRMXaNk')
shotNoises[3]=new Audio('https://drive.google.com/uc?export=download&id=1ihrCrH_qE1bkvwIco0HR5kCa-NyZqER8')
shotNoises[4]=new Audio('https://drive.google.com/uc?export=download&id=1mdsnoiReCyAJfwtXLmwoDFpBAR66ezy4')
shotNoises[5]=new Audio('https://drive.google.com/uc?export=download&id=1P0cfUV3DwV7zKbse_qXbqHmUPFh16oHi')

document.addEventListener("mousedown",mouseDownHandler, false);
document.addEventListener("mousemove",mouseMoveHandler, false);
document.addEventListener("mouseup",mouseUpHandler, false);
document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("touchstart",touchDownHandler, false);
document.addEventListener("touchend",touchUpHandler, false);

function imposeLimits(limitedValue,minLimit,maxLimit) {
	if (limitedValue<minLimit) {
		return minLimit
	} else if (limitedValue>maxLimit) {
		return maxLimit
	} else {
		return limitedValue
	}
}
function getTouchPos(cvas, evt) {
        var rect = cvas.getBoundingClientRect();
        return {
                x: evt.touches[0].clientX-rect.left,
                y: evt.touches[0].clientY-rect.top
        }
}
function getMousePos(cvas, evt) {
        var rect = cvas.getBoundingClientRect();
        return {
                x: evt.clientX-rect.left,
                y: evt.clientY-rect.top
        }
}
function drawImage(drawContext,img,xi,yi,scalei,anglei) {
	var vxi = Math.cos(anglei)*scalei;
	var vyi = Math.sin(anglei)*scalei;

	var imH = -(img.height/2);
	var imW = -(img.width/2);

	xi+=imW*vxi+imH*-vyi;
	yi+=imW*vyi+imH*vxi;

	drawContext.setTransform(vxi,vyi,-vyi,vxi,xi,yi);
	drawContext.drawImage(img,0,0);
	drawContext.setTransform(1,0,0,1,0,0);
}

function touchUpHandler(e) {
	e.preventDefault()
	touchLifted=1;
	for (let i=0;i<buttonX.length;i++) {
		buttonActive[i]=0
	}
}

function touchDownHandler(e) {
	e.preventDefault()
	if (touchLifted==1) {
		touchLifted=0
		touchpos=getTouchPos(canvas,e)
		checkKnobAction(touchpos)
		checkSwitchAction(touchpos)
		checkButtonAction(touchpos)
	}
}
function mouseUpHandler(e) {
	e.preventDefault()
	for (let i=0;i<buttonX.length;i++) {
		buttonActive[i]=0
	}
	draw()
}

function mouseMoveHandler(e) {
	e.preventDefault()
	mousepos=getMousePos(canvas,e)
	for (let i=0;i<knobX.length;i++) {
		if (knobActive[i]==1) {
			knobAngle[i]=knobNominal[i]+(mousepos.x-knobX[i])/canvas.width*6
		}
	}
}

function mouseDownHandler(e) {
	e.preventDefault()
	mousepos=getMousePos(canvas,e)
	checkKnobAction(mousepos)
	checkButtonAction(mousepos)
	checkSwitchAction(mousepos)
}

function keyDownHandler(e) {
	if (e.keyCode==83) {
		buttonAction(0)
	}
	if (e.keyCode==88) {
		knobAngle[0]+=knobAngleIncrement
		knobNominal[0]=knobAngle[0]
	}
	if (e.keyCode==90) {
		knobAngle[0]-=knobAngleIncrement
		knobNominal[0]=knobAngle[0]
	}
	if (e.keyCode==191) {
		knobAngle[1]+=knobAngleIncrement
		knobNominal[1]=knobAngle[1]
	}
	if (e.keyCode==190) {
		knobAngle[1]-=knobAngleIncrement
		knobNominal[1]=knobAngle[1]
	}
	if (e.keyCode==186) {
		buttonAction(1)
	}
}


function checkKnobAction(actionPosition) {
	for (let i=0;i<knobX.length;i++) {
		knobDistance=Math.sqrt(Math.pow(knobX[i]-actionPosition.x,2)+Math.pow(knobY[i]-actionPosition.y,2))
		if (knobDistance<knobClickDistance && knobActive[i]==0) {
			knobDisplaySize[i]*=0.95
			knobActive[i]=1
		} else {
			if (knobActive[i]==1) {
				knobDisplaySize[i]/=0.95
				knobNominal[i]=knobAngle[i]
			}
			knobActive[i]=0
		}
	}
}
function checkSwitchAction(actionPosition) {
	switchDistance=Math.sqrt(Math.pow(switchX-actionPosition.x,2)+Math.pow(switchY-actionPosition.y,2))
	if (switchDistance<switchClickDistance) {
		switchState=(switchState+1)%2;
	}
}
function checkButtonAction(actionPosition) {
	for (let i=0;i<buttonX.length;i++) {
		buttonDistance[i]=Math.sqrt(Math.pow(buttonX[i]-actionPosition.x,2)+Math.pow(buttonY[i]-actionPosition.y,2))
		if (buttonDistance[i]<buttonClickDistance && buttonActive[i]==0) {
			buttonActive[i]=1
			buttonAction(i)
		}
	}
}
function buttonAction(buttonNumber) {
	if (ballVisible==0) {
		ballVisible=1
		prepareServe(1)
		clearInterval(interval)
		interval=setInterval(draw,intervalTime)
	} else if (((buttonNumber==0 && x<netX) || (buttonNumber==1 && x>=netX)) && ballHit==0) {
		if (netHit==0) {
			hitBall(buttonNumber)
			if (buttonNumber==0) {
				computerPosition=netX+courtWidth/4+(Math.random()-0.4)*courtWidth*0.45
			}
		}
	}
}


function gameReset() {
	ballVisible=0
}

function draw() {
	ctx.clearRect(panelWidth,0,canvas.width,screenHeight)
	drawControls()
	drawCourt()
	if(y+vy>groundY-ballRadius) {
		vy=-vy*RCoeff;
		courtHit=1
	} 
	for (let i=0;i<xpos.length; i++) {
		brightness=getBeamFade(spotTimes[i],fadeScale1)*spotBrights[i]
		drawBall(xpos[i],ypos[i],brightness,0);
	}
	for (let i=0;i<xpos.length; i++) {
		brightness=getBeamFade(spotTimes[i],fadeScale2)
		drawBall(xpos[i],ypos[i],brightness,1);
	}
	x_old=x
	y_old=y
	if (ballActive==1) {
		vy += g-airCoeff*Math.pow(vy,2)*Math.sign(vy);
		vx += -airCoeff*Math.pow(vx,2)*Math.sign(vx);
		x += vx*scaleOverall;
		y += vy*scaleOverall;
	}
	if (y>groundY-ballRadius) {
		y=groundY-ballRadius
	}
	for (let i = 0; i<xpos.length-nOversample; i++) {
		xpos[i]=xpos[i+nOversample]	
		ypos[i]=ypos[i+nOversample]	
		spotBrights[i]=spotBrights[i+nOversample]	
		spotSizes[i]=spotSizes[i+nOversample]	
		spotTimes[i]=spotTimes[i+nOversample]+intervalTime	
	}
	for (let i=0;i<nOversample;i++) {
		xpos[xpos.length-1-i]=x_old+(x-x_old)*(nOversample-i)/nOversample
		ypos[xpos.length-1-i]=y_old+(y-y_old)*(nOversample-i)/nOversample
		spotBrights[nPersist-1-i]=0.6
		spotSizes[nPersist-1-i]=1
		spotTimes[nPersist-1-i]=i/nOversample*intervalTime
	}
	checkBoundaries()
	if (switchState==0) {
		checkComputer()
	}
	shownElement=(shownElement+1)%3
}

function checkComputer() {
	if (x>netX && Math.abs(x-computerPosition)<vx*1.05) {
		let angle=Math.PI*0.3-(x-netX)/courtWidth*coeffAIX+(groundY-y)/netHeight*coeffAIY
		if (groundY-y>2*netHeight) {
			angle=Math.PI/2
		}
		convertToKnobAngle(angle)
		if (groundY-y<5*netHeight*(1-(x-netX)/courtWidth*1.6) || courtHit==1) {
			hitBall(1)
		}
		courtHit=0
		netHit=0
		computerPosition=0
	}
}

function checkBoundaries() {
	if ((x-panelWidth-screenWidth/2>courtWidth/2)) {
		if (courtHit==1 || netHit==1) {
			playerServe=1
		} else {
			playerServe=2
		}
		netHit=0
		courtHit=0
		prepareServe(playerServe)
	}
	if (ballHit==1 && Math.abs(x-netX)<Math.abs(vx)) {
		ballHit=0
	}
	if ((Math.abs(x-netX)<Math.abs(vx) && y+vy>groundY-netHeight && netHit==0)) {
		vx=-vx
		netHit=1
	}
	if ((x-panelWidth-screenWidth/2<-courtWidth/2)) {
		if (courtHit==1 || netHit==1) {
			playerServe=2
		} else {
			playerServe=1
		}
		courtHit=0
		netHit=0
		prepareServe(playerServe)
	}
}


function drawControls() {
	ctx.clearRect(0,canvas.height-controlsHeight,canvas.width,canvas.height);
	drawImage(ctx,panelImage,widthFull/4,canvas.height-controlsHeight/2,scaleOverall,0)
	drawImage(ctx,panelImage,widthFull/4*3,canvas.height-controlsHeight/2,scaleOverall,0)
	ctx.strokeStyle='black'
	ctx.beginPath()
	ctx.lineWidth=5
	ctx.moveTo(canvas.width/2,canvas.height-controlsHeight)
	ctx.lineTo(canvas.width/2,canvas.height)
	ctx.closePath()
	ctx.stroke()
	drawButtons()
	drawKnobs()
	drawSwitch()
	drawLabels()
}

function drawLabels() {
	for(let i=0;i<labelX.length;i++) {
		if (canvas.height<400) {
			fontString=labelSize2[i].concat('px Courier New')
		} else {
			fontString=labelSize[i].concat('px Courier New')
		}
		ctx.font = fontString
		ctx.strokeStyle = labelColor[i]
		ctx.textAlign = 'right';
		ctx.lineWidth = 1
		ctx.strokeText(labelText[i],labelX[i],labelY[i])
		ctx.stroke()
	}
}

function drawKnobs() {
	for (let i=0;i<knobX.length;i++) {
		drawKnob(i)
	}
}

function getBeamFade(time,fadescale) {
	expFactor=Math.exp(-time/fadescale)
	return expFactor
}

function drawNet() {
}

function drawCourt() {
	if (useImages==1) {
		ctx.globalAlpha=Math.random()*0.2+0.8
		drawImage(ctx,courtImage,panelWidth+screenWidth/2,groundY-netHeight/2,courtWidth/courtSize[0],0)
		ctx.globalAlpha=1
	} else {
		ctx.strokeStyle='rgb(155.2,155.0,155.6)'
		ctx.beginPath()
		ctx.moveTo(panelWidth+0.5*(screenWidth-courtWidth),groundY)
		ctx.lineTo(panelWidth+0.5*screenWidth+0.5*courtWidth,groundY)
		ctx.closePath()
		ctx.stroke()
		ctx.beginPath()
		ctx.moveTo(panelWidth+0.5*screenWidth,groundY)
		ctx.lineTo(panelWidth+0.5*screenWidth,groundY-netHeight)
		ctx.closePath()
		ctx.stroke()
	}
}

function drawSwitch() {
	if (switchState==0) {
		drawImage(ctx,switch2Image,switchX,switchY,scaleOverall*switchDisplaySize,0)
	} else {
		drawImage(ctx,switch1Image,switchX,switchY,scaleOverall*switchDisplaySize,0)
	}
}

function drawKnobs() {
	for (let i=0;i<knobX.length;i++) {
		knobAngle[i]=imposeLimits(knobAngle[i],knobAngleMin[i],knobAngleMax[i])
		drawImage(ctx,knobImage,knobX[i],knobY[i],scaleOverall*knobDisplaySize[i],knobAngle[i]+knobImageAngle)
	}
}

function drawButtons() {
	for (let i=0;i<buttonX.length;i++) {
		if (buttonActive[i]==0) {
			drawImage(ctx,button2Image,buttonX[i],buttonY[i],scaleOverall*buttonDisplaySize[i],0)
		} else {
			drawImage(ctx,button1Image,buttonX[i],buttonY[i],scaleOverall*buttonDisplaySize[i],0)
		}
	}
}

function changeBallAngle() {
	ballAngle=Math.random()*Math.PI*2
}

function drawBall(pX,pY,brightness,ballNum) {
	if (ballVisible==1) {
		ctx.globalAlpha=brightness
		if (useImages==1) {
			drawImage(ctx,ballImage[ballNum],pX,pY,ballDisplaySize*scaleOverall*ballScaleFactor,0)
		} else {
			if (ballNum==0) {
				ctx.fillStyle='white'
			} else {
				ctx.fillStyle='green'
			}
			ctx.beginPath()
			ctx.moveTo(pX,pY)
			ctx.arc(pX,pY,ballRadius,0,Math.PI*2)
			ctx.closePath()
			ctx.fill()
		}
		ctx.globalAlpha=1
	}
}

function convertToKnobAngle(angle) {
	knobAngle[1]=(angle-angleLimits[0])*Math.PI/(angleLimits[1]-angleLimits[0])-Math.PI/2
	knobNominal[1]=knobAngle[1]
}

function computerServe() {
	angle=Math.PI*0.35*(1+Math.random()*0.4)
	convertToKnobAngle(angle)
	hitBall(1)
	computerPosition=0
}

function changeBallScaleFactor() {
	ballScaleFactor=2.0*(0.5-Math.random()*0.1)
}

function prepareServe(player) {
	y=groundY-netHeight*1.25
	x = panelWidth+0.5*(screenWidth-courtWidth)+0.08*courtWidth+(player-1)*0.84*courtWidth
	ballActive=0
	vx=0
	vy=0
	if (player==2 && switchState==0) {
		setTimeout(computerServe,computerServeWaitTime)
	}
}
function hitBall(player) {
	if (ballVisible==1) {
		angle=(knobAngle[player]+Math.PI/2)/Math.PI*(angleLimits[1]-angleLimits[0])+angleLimits[0]
		vx=-vHit*Math.sin(angle)*(player*2-1)
		vy=-vHit*Math.cos(angle)
		ballActive=1
		ballHit=1
		netHit=0
		courtHit=0
	}
}
function loadSprites() {
	ballImage[0]=new Image();
	ballImage[0].src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgsd-s98mcUNu-NI8j3cStPl96eiymUn_8d7IDsGzSCHv8R0aWhLLMShsQXqlL_wKHgcs7468F9Z9RwJxhfpLgXbZHa3cHu4nnkQJIszMM-vPc-e7aR2mNwgJV08UW1NGm2-lZj_f34UVBX/s17/ball_large_2.png"
	ballImage[0].onload = function () {
		gameReset()
	}
	ballImage[1]=new Image();
	ballImage[1].src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2LJ_T8wR5Ay46bIaQxWlN3e0wG2bFTUEetM1w0tM-YGLpUntHBJhSoHu1b7jmQHK1PfwOEWW2vRBsI22rqF-xo8-ly34vCQNM2ZazARUSCIYSMC3AkJnMz7cG-NZBX55GM3OSOs18jM8B/s2/ball_small.png"
	ballImage[1].onload = function () {
		draw()
	}
	panelImage=new Image(panelSize[0],panelSize[1]);
	panelImage.src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQPIIO2-bXzx8sUSwksbEuSxVOmFnj_hss6CzR615Gn2TNTsWQYVPOS_DKxI6lRet8uU0PQSaLT8nIKOCOjTeI4oK_8QlhpDR5tLCt4L4DVCaEOyxUBiQ2pSgj85mosib8QgkZs8w5dePz/s397/controlsPanel.png" 
	panelImage.onload = function () {
		draw()
	}
	knobImage=new Image(knobSize[0],knobSize[1]);
	knobImage.src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhM7hh92FrZASWyE0FG4bj5hF0MJS_19hxBaCkcqu9lv1JJxo2rFrnsBcDNCbrZ1nIL6TcNo_LZXHfXMkdtSLqqSyVkFV4YsaKbhyphenhyphenjnFQTf23y1oEbQfJKucSCNBr0cf9LxywVhF04q8TCb/s163/knob_cut.png"
	knobImage.onload = function () {
		draw()
	}
	courtImage=new Image(courtSize[0],courtSize[1]);
	courtImage.src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdshmBbomsUL60vcPj-K9iT680p1x2Bz9CxWras62pqmt-yhAyqnq67g8Uzr2NDmXN8JUQ-cA09ryeXnAazcxdZN3JD08CJpsAi05diVcO3FyW4AEQixPso_CNE25ZYESP32BOJ4uqEV1w/s167/court.png"
	courtImage.onload = function () {
		draw()
	}
	netImage=new Image(courtSize[0],courtSize[1]);
	netImage.src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdshmBbomsUL60vcPj-K9iT680p1x2Bz9CxWras62pqmt-yhAyqnq67g8Uzr2NDmXN8JUQ-cA09ryeXnAazcxdZN3JD08CJpsAi05diVcO3FyW4AEQixPso_CNE25ZYESP32BOJ4uqEV1w/s167/court.png"
	netImage.onload = function () {
		draw()
	}
	switch1Image=new Image(switchSize[0],switchSize[1]);
	switch1Image.src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6n8eWMtpfTlF7wyqui5MTeI4uVNLBvczcg1_C17_YdxuVQQ9evhGhegPshuTSwNWbrv5kL_jE9PksGlM2zWj_W1P6SZRkXJGgbIUF9wXl6Er8bTiCXP8uou9AR7IUWrt-Wn4xhXLz4S5J/s112/switch1.png"
	switch1Image.onload = function () {
		draw()
	}
	switch2Image=new Image(switchSize[0],switchSize[1]);
	switch2Image.src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiasskFQ9CmS1oStOkUlpE1xWZPjEhU93VJnlS66ibOCA2NnkHrV4j0QkDe6xWSd76Iao-41KQ_gSQ5_c671hZBAvEtbwDbGale4pE-3donvQMfy8RP1t9ebUoNf_cd15COgnrTSbQ8fXqX/s112/switch2.png"
	switch2Image.onload = function () {
		draw()
	}
	button1Image=new Image(buttonSize[0],buttonSize[1]);
	button1Image.src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpEIKpdm9eUWmY6UwKPL2U7epa9q9RtTsAvrU3nGbGRRJXaOC6YZyUJ6MAjBbHx-0Ze-lJ8VzXuWnATaZindkXyUDfcAjkTClMQNs0_NLQCjCCH6rWWlbf55EiN6Ed5Z2Ey-U6h45WT_or/s103/radiobutton1.png"
	button1Image.onload = function () {
		draw()
	}
	button2Image=new Image(buttonSize[0],buttonSize[1]);
	button2Image.src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK66T7heDZPFZNpweiOJ-V5V3-Vt_E3xnrxM80zCXCtV0g-WtvOuxn0GoDIj3o43eCLZIJ1YHlPouVmVPpvtJH5hvepl4swENKPV8QLARPMwu7tSUVJC2Bj62XQF9Cl1ktTLx4rRJ-9njK/s103/radiobutton2.png"
	button2Image.onload = function () {
		draw()
	}
	frameImage=new Image(frameSize[0],frameSize[1]);
	frameImage.src=""
	frameImage.onload = function () {
		draw()
	}
}
loadSprites()

/*CERRAR LA MODAL Y QUITAR ESTILOS*/


  // modal-functions.js