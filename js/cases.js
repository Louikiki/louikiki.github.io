/**
 * 案例展示页面JavaScript
 * 仅保留初始化动画
 */

document.addEventListener('DOMContentLoaded', function() {
    const caseItems = document.querySelectorAll('.case-item');
    
    // 初始化案例项动画
    caseItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
