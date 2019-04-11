const baseIp = 'http://localhost:8083';

export default {
    studentInfo: `${baseIp}/studentInfo`,  //学生信息
    userInfo:`${baseIp}/user`,  //用户信息
    login:`${baseIp}/login`,   //登录
    sketch:`${baseIp}/Sketch`,   //素拓分
    sketchScore: `${baseIp}/SketchScore`,  //素拓数据字典
    moralPlus:`${baseIp}/MoralPlus`,   //德育加分数据字典
    moralDeduction:`${baseIp}/moralDeduction`,  //德育减分数据字典
    moralOut:`${baseIp}/moralOut`, //课外加分数据字典
    checkingIn:`${baseIp}/studentChecking`,  //考勤
    Leaving:`${baseIp}/Leaving`, //请假
    SketchAnalysis:`${baseIp}/sketchAnalysis`, //素拓分求和
    SketchCount:`${baseIp}/SketchCount`,  //素拓分总分
    StudentMoral:`${baseIp}/studentMoralPlus`, //
    StudentMoralOut:`${baseIp}/studentMoralOut`,
    Apply:`${baseIp}/apply`, //
    moralExpression:`${baseIp}/MoralExpression`,
    StudentMoralExpression:`${baseIp}/studentMoralExpression`,
    Role:`${baseIp}/role`, //角色
    Permission:`${baseIp}/permission`, //权限
    RolePermission:`${baseIp}/rolePermission`, //角色权限中间表
    UserRole:`${baseIp}/userRole`, //用户角色中间表
}