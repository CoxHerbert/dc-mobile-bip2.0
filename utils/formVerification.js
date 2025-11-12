export function selfloginFormVerification(formData) {
    let that = this;
    let cardNoTest = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    const phoneRegex = /^1(3|4|5|6|7|8|9)\d{9}$/;
    return new Promise((resolve, reject) => {
        if (!formData.avatarId) {
            uni.showToast({ title: '请上传个人照片', icon: 'none' });
            reject();
        } else if (!formData.name) {
            uni.showToast({ title: '请输入姓名', icon: 'none' });
            reject();
        } else if (!formData.age) {
            uni.showToast({ title: '请输入年龄', icon: 'none' });
            reject();
        } else if (!formData.cardNo) {
            uni.showToast({ title: '请输入身份证号', icon: 'none' });
            reject();
        } else if (!formData.idCardFront) {
            uni.showToast({ title: '请上传身份证正面', icon: 'none' });
            reject();
        } else if (!formData.idCardBack) {
            uni.showToast({ title: '请上传身份证反面', icon: 'none' });
            reject();
        } else if (!cardNoTest.test(formData.cardNo)) {
            uni.showToast({ title: '请输入正确的身份证号', icon: 'none' });
            reject();
        } else if (!formData.mobile) {
            uni.showToast({ title: '请输入联系电话', icon: 'none' });
            reject();
        } else if (!phoneRegex.test(formData.mobile)) {
            uni.showToast({ title: '请输入正确的联系电话', icon: 'none' });
            reject();
        } else if (!formData.nation) {
            uni.showToast({ title: '请选择民族', icon: 'none' });
            reject();
        } else if (!formData.address) {
            uni.showToast({ title: '请输入籍贯', icon: 'none' });
            reject();
        } else if (!formData.education) {
            uni.showToast({ title: '请选择文化程度', icon: 'none' });
            reject();
        } else if (!formData.graduateSchool) {
            uni.showToast({ title: '请输入毕业院校', icon: 'none' });
            reject();
        } else if (!formData.companyDict) {
            uni.showToast({ title: '请选择外协公司', icon: 'none' });
            reject();
        } else if (!formData.jobGradeDictCode) {
            uni.showToast({ title: '请输入岗位', icon: 'none' });
            reject();
        } else if (!formData.workYear) {
            uni.showToast({ title: '请选择工作年限', icon: 'none' });
            reject();
        } else if (!formData.isAccommodation) {
            uni.showToast({ title: '请选择是否住宿', icon: 'none' });
            reject();
        } else {
            resolve(200);
        }
    });
}
