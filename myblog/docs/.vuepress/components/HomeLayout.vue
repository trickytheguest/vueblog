<template>
    <el-container direction="vertical">
            <div class="main">
                <el-card class="box-card">
                    <img class="circle-img" src="../public/img/logo.png" />
                    <p align="center" class="main-text">姜帅杰</p>
                    <p align="center" class="main-text">知识的贫穷，限制了你的想象力。</p>
                    <div class="categories">
                      <el-button size="mini" type="success" round @click="openPage('https://blog.csdn.net/codeteenager')">csdn</el-button>
                      <!-- <el-button size="mini" type="success" round @click="openPage('https://www.jianshu.com/u/1ecc865785a8')">简书</el-button>
                      <el-button size="mini" type="success" round @click="openPage('https://juejin.im/user/5b18ba836fb9a01e286226fa')">掘金</el-button> -->
                      <el-button size="mini" type="success" round @click="openPage('https://segmentfault.com/u/codeteenager')">segmentFault</el-button>
                    </div>
                    <!-- <div class="categories hidden-md-and-up">
                      <el-button size="mini" type="success" round @click="openPage('https://blog.csdn.net/codeteenager')">csdn</el-button>
                      <el-button size="mini" type="success" round @click="openPage('https://www.jianshu.com/u/1ecc865785a8')">简书</el-button>
                      <el-button size="mini" type="success" round @click="openPage('https://juejin.im/user/5b18ba836fb9a01e286226fa')">掘金</el-button>
                    </div>
                    <div class="categories hidden-md-and-up">
                      <el-button size="mini" type="success" round @click="openPage('https://segmentfault.com/u/codeteenager')">segmentFault</el-button>
                    </div> -->
                </el-card>
            </div>
            <div class="skill">
                <div class="title">
                    <i class="el-icon-loading" style="margin-right:20px;"></i>
                    技能概览 
                    <i class="el-icon-loading" style="margin-left:20px;"></i>
                </div>
                <div class="hidden-md-and-up">
                <el-row :gutter="10">
                    <el-col :span="6">
                            <el-progress type="circle" :percentage="80"></el-progress>
                            <p>java</p>
                    </el-col>
                    <el-col :span="6">
                            <el-progress type="circle" :percentage="80"></el-progress>
                            <p>kotlin</p>
                    </el-col>
                    <el-col :span="6">
                            <el-progress type="circle" :percentage="80"></el-progress>
                            <p>android</p>
                    </el-col>
                    <el-col :span="6">
                            <el-progress type="circle" :percentage="80"></el-progress>
                            <p>javascript</p>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="6">
                            <el-progress type="circle" :percentage="80" ></el-progress>
                            <p>vue</p>
                    </el-col>
                    <el-col :span="6">
                            <el-progress type="circle" :percentage="80" ></el-progress>
                            <p>Object-c</p>
                    </el-col>
                    <el-col :span="6">
                            <el-progress type="circle" :percentage="80"></el-progress>
                            <p>node</p>
                    </el-col>
                    <el-col :span="6">
                            <el-progress type="circle" :percentage="80" ></el-progress>
                            <p>hybrid</p>
                    </el-col>
                </el-row>
            </div>
            <div class="hidden-md-and-down">
              <el-row :gutter="20">
                    <el-col :span="6">
                            <el-progress type="circle" :percentage="80" ></el-progress>
                            <p>java</p>
                    </el-col>
                    <el-col :span="6">
                            <el-progress type="circle" :percentage="80" ></el-progress>
                            <p>kotlin</p>
                    </el-col>
                    <el-col :span="6">
                            <el-progress type="circle" :percentage="80" ></el-progress>
                            <p>android</p>
                    </el-col>
                    <el-col :span="6">
                            <el-progress type="circle" :percentage="80" ></el-progress>
                            <p>javascript</p>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                            <el-progress type="circle" :percentage="80"></el-progress>
                            <p>vue</p>
                    </el-col>
                    <el-col :span="6">
                            <el-progress type="circle" :percentage="80"></el-progress>
                            <p>Object-c</p>
                    </el-col>
                    <el-col :span="6">
                            <el-progress type="circle" :percentage="80"></el-progress>
                            <p>node</p>
                    </el-col>
                    <el-col :span="6">
                            <el-progress type="circle" :percentage="80"></el-progress>
                            <p>hybrid</p>
                    </el-col>
                </el-row>
            </div>
                
            </div>
            <div class="experience">
                <div class="title">
                    <i class="el-icon-loading" style="margin-right:20px;"></i>
                    工作经历
                    <i class="el-icon-loading" style="margin-left:20px;"></i>
                </div>
                <div class="experience-content">
                    <el-steps direction="vertical" :active="3" finish-status="process">
                        <el-step title="北京中教美育" icon="el-icon-location-outline" description="主要负责自研产品MOORs一站式学习平台App的开发"></el-step>
                        <el-step title="北京赞同科技" icon="el-icon-location-outline" description="参与移动开发平台架构和核心功能设计，参与EMM(Enterprise Mobile Management平台基础功能调研和架构设计。"></el-step>
                        <el-step title="未完待续" icon="el-icon-location-outline" description=""></el-step>
                    </el-steps>
                </div>
            </div>
            <div class="contact">
                <div style="width:100%;height:80%;">
                  <el-row class="hidden-md-and-down">
                    <el-col :span="8">
                        <div class="qrcode">
                          <p>微信公众号</p>
                          <img src="../public/img/public.jpg" >
                        </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="qrcode">
                        <p>知识星球</p>
                        <img src="../public/img/planet.png"  >
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="qrcode">
                        <p>个人主页</p>
                        <img src="../public/img/homepage.png">
                      </div>
                    </el-col>
                  </el-row>
                  <div class="hidden-md-and-up" style="width:100%;">
                      <div class="qrcode">
                        <p>微信公众号</p>
                        <img src="../public/img/public.jpg" >
                      </div>
                      <div class="qrcode">
                        <p>知识星球</p>
                        <img src="../public/img/planet.png"  >
                      </div>
                      <div class="qrcode">
                        <p>个人主页</p>
                        <img src="../public/img/homepage.png">
                      </div>
                  </div>
                </div>
                <div class="footer-link">
                    <el-button type="warning" circle @click="openPage('https://www.zhihu.com/people/codeteenager/activities')">知</el-button>
                    <el-button type="warning" circle @click="openPage('https://xiaozhuanlan.com/u/codeteenager')">专</el-button>
                    <el-button type="warning" circle @click="openPage('https://www.jianshu.com/u/1ecc865785a8')">简</el-button>
                     <el-button type="warning" circle @click="openPage('https://juejin.im/user/5b18ba836fb9a01e286226fa')">掘</el-button>
                  </div>
                <div class="hidden-md-and-down footer">
                    Copyright © 2018 jiangshuaijie.com 京ICP备17065332号
                </div>
                <div class="hidden-md-and-up footer">
                    <div>Copyright © 2018 jiangshuaijie.com</div>
                     <div>京ICP备17065332号</div>
                </div>
            </div>
    </el-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    openPage(url) {
      window.open(url);
    }
  }
};
</script>
<style scoped>
@media (min-width: 1200px) {
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 800px;
    width: 100%;
    background: url("../public/img/services-bg.jpg");
    overflow-x: hidden;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
  .box-card {
    width: 400px;
  }
  .audio-music {
    position: absolute;
    right: 0px;
    top: 100px;
  }
  .circle-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .skill {
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: column;
    background-color: #f2f6fc;
    background: url("../public/img/skills-bg.jpg");
    overflow-x: hidden;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
  .experience {
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
  .experience-content {
    height: 70%;
    margin-top: 40px;
  }
  .el-steps {
    width: 400px;
  }

  .skill .el-row {
    margin-top: 50px;
    margin-bottom: 20px;
  }
  .skill .el-col {
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .contact {
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    background: url("../public/img/contact-bg.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
  .contact .footer {
    width: 100%;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .contact .el-row {
    width: 100%;
    margin-top: 50px;
  }
  .contact .qrcode {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .contact .qrcode img {
    width: 200px;
    margin-top: 20px;
  }
  .contact .qrcode p {
    color: white;
  }
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  height: 15%;
  font-family: "PingFang SC";
}
.footer-link {
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1020px) {
  .box-card {
    width: 80%;
  }
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 300px;
    background: url("../public/img/services-bg.jpg");
    overflow-x: hidden;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
  .circle-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .main-text {
    margin: 0px;
  }
  .categories {
    margin-top: 6px;
  }
  .skill {
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    background-color: #f2f6fc;
    background: url("../public/img/skills-bg.jpg");
    overflow-x: hidden;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
  .experience {
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
  .experience-content {
    height: 70%;
    margin-top: 20px;
  }
  .el-steps {
    width: 300px;
  }

  .skill .el-row {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .skill .el-col {
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .contact {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    background: url("../public/img/contact-bg.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
  .contact .footer {
    padding: 20px;
    width: 100%;
    height: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .contact .hidden-md-and-up .qrcode {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .contact .qrcode img {
    width: 200px;
    margin-top: 8px;
  }
  .contact .qrcode p {
    color: white;
  }
}
</style>
<style>
.el-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>


