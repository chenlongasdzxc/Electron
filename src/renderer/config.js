const baseIp = 'http://localhost:8083';

export default {
    studentInfo: `${baseIp}/studentInfo`,  //学生信息
    userInfo:`${baseIp}/user`,  //用户信息
    login:`${baseIp}/login`,   //登录
    sketch:`${baseIp}/Sketch`,   //素拓分
    sketchScore: `${baseIp}/SketchScore`,  //素拓数据字典
    moralPlus:`${baseIp}/MoralPlus`,   //德育加分数据字典
    moralDeduction:`${baseIp}/moralDeduction`,  //德育减分数据字典
    checkingIn:`${baseIp}/studentChecking`,  //考勤
    Leaving:`${baseIp}/Leaving`, //请假
}