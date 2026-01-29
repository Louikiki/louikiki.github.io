/**
 * 联系我们页面JavaScript
 * 处理表单提交和验证
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 表单验证
            if (window.HouxianTech && window.HouxianTech.validateForm) {
                if (window.HouxianTech.validateForm(this)) {
                    // 这里可以添加实际的表单提交逻辑
                    // 例如：发送到服务器或显示成功消息
                    alert('感谢您的咨询！我们会尽快与您联系。');
                    this.reset();
                } else {
                    alert('请填写所有必填项。');
                }
            }
        });
        
        // 实时验证
        const requiredInputs = contactForm.querySelectorAll('input[required], textarea[required]');
        requiredInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim()) {
                    this.classList.remove('error');
                } else {
                    this.classList.add('error');
                }
            });
        });
    }
});
