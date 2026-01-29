/**
 * 厚贤咨询官网主JavaScript文件
 * 处理导航、滚动效果、动画等交互功能
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initCarousel();
    initBannerBackgrounds();
    initScrollEffects();
    initAnimations();
    initBackToTop();
    initIndustryPagination();
});

/**
 * 初始化导航栏功能
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    // 移动端菜单切换
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // 滚动时改变导航栏样式
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // 点击菜单项后关闭移动端菜单
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

/**
 * 首页轮播
 */
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const slides = Array.from(track.children);
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;
    let timer = null;

    const createDots = () => {
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `切换到第${index + 1}张`);
            dot.addEventListener('click', () => {
                goToSlide(index);
                restartTimer();
            });
            dotsContainer.appendChild(dot);
        });
    };

    const updateActiveStates = () => {
        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === currentIndex);
        });
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    };

    const goToSlide = (index) => {
        currentIndex = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        updateActiveStates();
    };

    const nextSlide = () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    };

    const startTimer = () => {
        timer = setInterval(nextSlide, 5000);
    };

    const restartTimer = () => {
        clearInterval(timer);
        startTimer();
    };

    createDots();
    goToSlide(0);
    startTimer();
}

/**
 * Banner背景轮播
 */
function initBannerBackgrounds() {
    const backgrounds = document.querySelectorAll('.banner-bg');
    const dotsContainer = document.querySelector('.banner-dots');
    const titleEl = document.querySelector('.banner-title');
    const subtitleEl = document.querySelector('.banner-subtitle');
    const kickerEl = document.querySelector('.banner-kicker');
    if (!backgrounds.length || !dotsContainer) return;

    const slides = [
        {
            bg: "images/banner-bg1.svg",
            kicker: "专业 · 高效 · 可信赖",
            title: "预算绩效管理全过程咨询",
            desc: "覆盖事前评估、事中跟踪、事后评价全过程，构建闭环管理体系，赋能政府高效履职"
        },
        {
            bg: "images/banner-bg2.svg",
            kicker: "全类型 · 精准覆盖",
            title: "全类型预算绩效管理服务",
            desc: "涵盖预算评估、绩效评价、成本分析等全类型评价，适配多元预算绩效管理需求"
        },
        {
            bg: "images/banner-bg3.svg",
            kicker: "多领域 · 价值赋能",
            title: "跨域绩效服务与效能升级",
            desc: "深耕养老、教育、工程基建、环保、交通等领域，以专业方案助力资金提质与政策落地"
        }
    ];

    let currentIndex = 0;
    let timer = null;

    const setActive = (index) => {
        backgrounds.forEach((bg, idx) => {
            bg.classList.toggle('active', idx === index);
            if (slides[idx]) {
                bg.style.backgroundImage = `url('${slides[idx].bg}')`;
            }
        });
        const dots = dotsContainer.querySelectorAll('.banner-dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });

        const slide = slides[index];
        if (slide) {
            if (kickerEl) kickerEl.textContent = slide.kicker;
            if (titleEl) titleEl.textContent = slide.title;
            if (subtitleEl) subtitleEl.textContent = slide.desc;
        }
    };

    const goTo = (index) => {
        currentIndex = index;
        setActive(currentIndex);
    };

    const next = () => {
        const nextIndex = (currentIndex + 1) % backgrounds.length;
        goTo(nextIndex);
    };

    const startTimer = () => {
        timer = setInterval(next, 6000);
    };

    const restartTimer = () => {
        clearInterval(timer);
        startTimer();
    };

    backgrounds.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'banner-dot';
        dot.setAttribute('aria-label', `切换到第${index + 1}张背景`);
        dot.addEventListener('click', () => {
            goTo(index);
            restartTimer();
        });
        dotsContainer.appendChild(dot);
    });

    goTo(0);
    startTimer();
}

/**
 * 初始化滚动效果
 */
function initScrollEffects() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // 如果是跳转到contact（页脚），使用end定位，否则使用start
                const isContact = this.getAttribute('href') === '#contact';
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: isContact ? 'end' : 'start'
                });
            }
        });
    });
}

/**
 * 初始化动画效果
 */
function initAnimations() {
    // 数字计数动画
    const animatedNumbers = document.querySelectorAll('.stat-number, .advantage-number, .banner-stat-number');
    
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const unitSpan = element.querySelector('.unit'); // 获取内部的单位元素

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);

            // 更新数字部分，保留单位
            if (unitSpan) {
                element.innerHTML = current + '<span class="unit">' + unitSpan.textContent + '</span>';
            } else {
                element.textContent = current;
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // 动画结束时确保最终数字
                if (unitSpan) {
                    element.innerHTML = end + '<span class="unit">' + unitSpan.textContent + '</span>';
                } else {
                    element.textContent = end;
                }
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // 使用Intersection Observer监听元素进入视口
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    animatedNumbers.forEach(numEl => {
        observer.observe(numEl);
    });
    
    // 卡片淡入动画
    const cards = document.querySelectorAll('.service-card, .case-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
}

/**
 * 初始化返回顶部按钮
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * 表单验证（用于联系页面）
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

/**
 * 工具函数：防抖
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 行业资讯列表分页（行业动态页面）
 * 仅展示标题，按每页6条分页
 */
function initIndustryPagination() {
    const list = document.querySelector('.industry-list-news');
    if (!list) return;

    const items = Array.from(list.querySelectorAll('.industry-item'));
    const pageSize = 6;
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    if (items.length <= pageSize) return; // 不足一页时不显示分页

    let currentPage = 1;
    let pagination;

    const renderPage = (page) => {
        currentPage = page;
        items.forEach((item, index) => {
            const start = (currentPage - 1) * pageSize;
            const end = currentPage * pageSize;
            item.style.display = index >= start && index < end ? '' : 'none';
        });

        if (pagination) {
            const buttons = pagination.querySelectorAll('.industry-page-btn');
            buttons.forEach(btn => {
                const pageNum = parseInt(btn.getAttribute('data-page'), 10);
                btn.classList.toggle('active', pageNum === currentPage);
                
                // 禁用超出范围的导航按钮
                if (btn.classList.contains('nav')) {
                    if ((btn.textContent === '上一页' && currentPage === 1) || 
                        (btn.textContent === '下一页' && currentPage === totalPages)) {
                        btn.disabled = true;
                        btn.classList.add('disabled');
                    } else {
                        btn.disabled = false;
                        btn.classList.remove('disabled');
                    }
                }
            });
        }
    };

    const createPageButton = (label, page, isNav = false) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = label;
        btn.className = isNav ? 'industry-page-btn nav' : 'industry-page-btn';
        btn.setAttribute('data-page', page);
        
        // 初始禁用超出范围的导航按钮
        if (isNav) {
            if ((label === '上一页' && page < 1) || (label === '下一页' && page > totalPages)) {
                btn.disabled = true;
                btn.classList.add('disabled');
            }
        }
        
        btn.addEventListener('click', () => {
            let targetPage;
            if (isNav) {
                // 导航按钮根据当前页面计算目标页码
                if (label === '上一页') {
                    targetPage = currentPage - 1;
                } else if (label === '下一页') {
                    targetPage = currentPage + 1;
                }
            } else {
                // 数字按钮直接使用data-page值
                targetPage = parseInt(btn.getAttribute('data-page'), 10);
            }
            
            if (targetPage < 1 || targetPage > totalPages || targetPage === currentPage) return;
            renderPage(targetPage);
        });
        return btn;
    };

    // 创建分页容器
    pagination = document.createElement('div');
    pagination.className = 'industry-pagination';

    // 上一页
    pagination.appendChild(createPageButton('上一页', 0, true));

    // 数字页码
    for (let i = 1; i <= totalPages; i++) {
        pagination.appendChild(createPageButton(String(i), i, false));
    }

    // 下一页
    pagination.appendChild(createPageButton('下一页', totalPages + 1, true));

    list.parentNode.appendChild(pagination);

    // 初始渲染第1页
    renderPage(1);
}

// 导出函数供其他页面使用
window.HouxianTech = {
    validateForm,
    debounce
};
