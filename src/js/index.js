const { createApp, ref, onMounted, onUnmounted, watch, computed } = Vue;

createApp({
  setup() {
    // 导航链接
    const navLinks = [
      { text: '首页', href: '#home' },
      { text: '关于', href: '#about' },
      { text: '经历', href: '#experience' },
      { text: '作品', href: '#portfolio' },
      { text: '联系', href: '#contact' }
    ];

    // 当前激活的导航部分
    const activeSection = ref('home');

    // 当前悬停的链接
    const hoveredLink = ref(null);

    // 移动菜单状态
    const mobileMenuOpen = ref(false);

    // 暗黑模式
    const darkMode = ref(true);

    // 首页统计
    const stats = [
      { value: '60+', label: '完成项目' },
      { value: '50+', label: '满意客户' },
      { value: '9', suffix: '+', label: '平均评分' },
      { value: '7×24', label: '技术支持' }
    ];

    // 技能
    const skills = [
      { name: 'Vue  & Nuxt', level: 95, icon: 'fab fa-vuejs' },
      { name: 'React & Next', level: 90, icon: 'fab fa-react' },
      { name: 'TypeScript', level: 92, icon: 'fab fa-js' },
      { name: 'Three.js & WebGL', level: 88, icon: 'fas fa-cube' },
      { name: '性能优化', level: 90, icon: 'fas fa-tachometer-alt' },
      { name: 'UI/UX 设计', level: 70, icon: 'fas fa-paint-brush' }
    ];

    // 标签
    const tags = ['前端架构', 'JAMStack', 'PWA', 'WebGL', '微前端', '设计系统', '无障碍设计', '公众号', '小程序', 'APP'];

    // 环形技能
    const circularSkills = [
      { name: 'Vue ', percentage: 95, years: '8+ ' },
      { name: 'TypeScript', percentage: 92, years: '8+ ' },
      { name: '前端架构', percentage: 90, years: '8+ ' },
      { name: '性能优化', percentage: 93, years: '10+ ' }
    ];

    // 工作经历
    const experiences = [
      {
        position: '前端架构师',
        company: '深圳金风信用科技有限公司',
        duration: '2020.02 - 2026.06',
        description: '贷款类信息广告平台及区块链钱包、周边社区等产品开发。',
        work: '负责核心产品前端架构设计与开发，主导了多个大型项目的性能优化，将首屏加载时间平均缩短50%。使用Vue、TypeScript和WebGL构建高性能应用，实现跨平台兼容性。',
        skills: ['Vue ', 'TypeScript', 'JAMStack', '性能优化', '团队领导']
      },
      {
        position: '前端开发工程师',
        company: '芜湖拓美文化传媒有限公司',
        duration: '2018.03 - 2019.12',
        description: '500彩票高管创业团队，彩票相关业务开发。',
        work: '负责移动端 Web框架与后台系统的搭建，实现前后端分离开发模式。主导微信公众号及小程序的开发与维护，解决多客户端渲染兼容性问题。',
        skills: ['Vue', 'React', 'Webpack', 'UI/UX', '团队协作']
      },
      {
        position: '前端开发',
        company: '北京北信智科科技有限公司',
        duration: '2015.08 - 2018.01',
        description: '政府类软件外包，开发社区服务管理平台、OA系统等。',
        work: '负责政府门户网站及管理平台的前端开发，旧版系统的技术更新与迭代，提升系统稳定性与用户体验',
        skills: ['无障碍网站开发', 'HTML5', '性能优化']
      }
    ];

    // 项目
    const projects = [
      {
        id: 1,
        title: '区块链游戏门户网站',
        category: '区块链游戏社区',
        description: '主导Nuxt SSR 架构落地，设计动态 Meta 注入与 SSG 混合渲染策略，使核心关键词搜索引擎收录率提升80%，自然搜索流量增长3倍；封装统一的EOS钱包适配器与RPC缓存层，将链上数据平均加载时间从2.5s降至600ms，显著提升DApp 交互流畅度。',
        technologies: ['Vue 3', 'Webpack', 'Ethers.js'],
        href: 'https://www.jbb.one/',
        challenge: '基于 Vue  构建高复用、低耦合的中后台系统，支撑日活 1W+ 用户稳定运行在保持视觉吸引力的同时，将首屏加载时间优化至0.8秒内，提升转化率40%'
      },
      {
        id: 2,
        title: '乐事助手',
        category: '互联网彩票平台',
        description: '从0到1搭建移动端SPA框架，设计统一的 WebSocket 消息总线实现开奖数据实时推送，通过 Web Worker 将奖金计算逻辑移出主线程，使页面帧率稳定在55fps+；制定组件规范与代码审查流程，团队开发效率提升约 30%。',
        technologies: ['Vue', 'UI/UX', '小程序', '公众号'],
        href: 'https://shcfa.ltdp16.com/',
        challenge: '解决大规模数据渲染性能瓶颈，实现60fps流畅交互体验'
      },
      {
        id: 3,
        title: '中国残疾人体育运动管理中心',
        category: '政府门户网站',
        description: '主导门户网站无障碍改造专项，基于WAI-ARIA+键盘导航重构核心交互组件，使站点通过国家WCAG 2.0 AA级认证，视障用户任务完成率从35% 提升至92%；制定团队级语义化编码规范与W3C校验流程，代码质量评分提升40%，项目顺利通过政务安全审计验收。',
        technologies: ['性能优化', '无障碍网站开发', '维护迭代'],
        href: 'https://www.caspd.org.cn/',
        challenge: '无障碍（Accessibility）为中国残疾人体育运动管理中心官网实现完整a11y支持（ARIA、键盘导航、语义化结构）'
      }
    ];

    // 当前悬停的项目
    const hoveredProject = ref(null);

    // 社交媒体
    const socials = [
      { icon: 'fab fa-github', url: 'https://github.com' },
      { icon: 'fab fa-linkedin', url: 'https://linkedin.com' },
      { icon: 'fab fa-twitter', url: 'https://twitter.com' },
      { icon: 'fab fa-dribbble', url: 'https://dribbble.com' }
    ];

    // 表单数据
    const formData = ref({
      name: '',
      email: '',
      message: ''
    });

    // DOM 引用
    const cursorFollower = ref(null);
    const particlesCanvas = ref(null);
    const scrollTopBtn = ref(null);
    const progressBar = ref(null);
    const navbar = ref(null);

    // 滚动到指定区域
    const scrollToSection = (sectionId) => {
      const element = document.querySelector(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
      mobileMenuOpen.value = false;
    };

    // 关闭移动菜单并滚动
    const closeMobileMenu = (sectionId) => {
      mobileMenuOpen.value = false;
      scrollToSection(sectionId);
    };

    // 滚动到顶部
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    // 切换主题
    const toggleTheme = () => {
      darkMode.value = !darkMode.value;
      document.documentElement.classList.toggle('dark', darkMode.value);
      localStorage.setItem('darkMode', darkMode.value);
    };

    // 切换移动端菜单
    const toggleMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    };

    // 检查滚动位置，更新导航活动状态
    const checkScrollPosition = () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('nav a');
      const scrollPosition = window.scrollY + 100; // 偏移量，使导航更精准

      let currentSection = 'home';

      sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = section.id;
        }
      });

      activeSection.value = currentSection;

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });

      // 更新回到顶部按钮的可见性
      if (scrollTopBtn.value) {
        scrollTopBtn.value.classList.toggle('visible', window.scrollY > 300);
      }

      // 更新滚动进度条
      if (progressBar.value) {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.value.style.width = `${scrolled}%`;
      }

      // 更新导航栏背景
      if (navbar.value) {
        if (window.scrollY > 100) {
          navbar.value.style.boxShadow = '0 2px 10px -4px #6e59ef';

        } else {
          navbar.value.style.boxShadow = 'none';
        }
      }
    };

    // 初始化粒子背景
    const initParticles = () => {
      const canvas = particlesCanvas.value;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const particles = [];
      const particleCount = 80;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      resizeCanvas();

      class Particle {
        constructor() {
          this.reset();
        }

        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 3 + 1;
          this.speedX = Math.random() * 0.5 - 0.25;
          this.speedY = Math.random() * 0.5 - 0.25;
          this.color = `hsl(${Math.random() * 60 + 240}, 70%, 60%)`;
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          // 当粒子离开画布时重置位置
          if (this.x > canvas.width + 10 || this.x < -10 ||
            this.y > canvas.height + 10 || this.y < -10) {
            this.reset();
          }
        }

        draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 创建粒子
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      // 动画循环
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.6;

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }

        requestAnimationFrame(animate);
      };

      // 开始动画
      animate();

      // 窗口大小调整时重新设置画布大小
      window.addEventListener('resize', resizeCanvas);

      // 组件卸载时移除监听器
      onUnmounted(() => {
        window.removeEventListener('resize', resizeCanvas);
      });
    };

    // 初始化自定义光标
    const initCursor = () => {
      const cursor = cursorFollower.value;
      if (!cursor) return;

      // 鼠标移动事件
      const onMouseMove = (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2
        });
      };

      // 鼠标进入/离开交互元素
      const interactiveElements = document.querySelectorAll('a, button, .card-3d, input, textarea');
      const originalCursor = cursor.style.cursor;

      const onMouseEnterInteractive = () => {
        gsap.to(cursor, { scale: 2, opacity: 0.7, duration: 0.3 });
      };

      const onMouseLeaveInteractive = () => {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      };

      // 添加事件监听
      document.addEventListener('mousemove', onMouseMove);

      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', onMouseEnterInteractive);
        element.addEventListener('mouseleave', onMouseLeaveInteractive);
      });

      // 组件卸载时移除监听器
      onUnmounted(() => {
        document.removeEventListener('mousemove', onMouseMove);
        interactiveElements.forEach(element => {
          element.removeEventListener('mouseenter', onMouseEnterInteractive);
          element.removeEventListener('mouseleave', onMouseLeaveInteractive);
        });
      });
    };

    // 初始化GSAP动画
    const initAnimations = () => {
      // 只在客户端初始化GSAP
      if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 技能环形图动画
        gsap.utils.toArray('.skill-ring').forEach((ring, i) => {
          const circle = ring.querySelector('.progress-circle');
          const originalOffset = circle.getAttribute('stroke-dashoffset');

          gsap.fromTo(circle,
            { strokeDashoffset: 283 },
            {
              scrollTrigger: {
                trigger: ring,
                start: 'top 90%',
                toggleActions: 'play none none none'
              },
              strokeDashoffset: originalOffset,
              duration: 1.2,
              delay: i * 0.1,
              ease: 'power2.out'
            }
          );
        });

        // 卡片淡入动画
        gsap.utils.toArray('.card-3d').forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0.2, y: 50 },
            {
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
              },
              opacity: 1,
              y: 0,
              duration: 1,
              delay: i * 0.1,
              ease: 'power3.out'
            }
          );
        });

        // 工作经历区域动画
        gsap.utils.toArray('#experience .bg-dark-800').forEach((experience, i) => {
          gsap.fromTo(experience,
            { opacity: 0, y: 30 },
            {
              scrollTrigger: {
                trigger: experience,
                start: 'top 90%',
                toggleActions: 'play none none none'
              },
              opacity: 1,
              y: 0,
              duration: 1,
              delay: i * 0.1,
              ease: 'power3.out'
            }
          );
        });
      }
    };

    // 初始化
    onMounted(() => {
      // 从localStorage读取主题设置
      const savedDarkMode = localStorage.getItem('darkMode');
   
      if (savedDarkMode !== null) {
        
        darkMode.value = JSON.parse(savedDarkMode);
        document.documentElement.classList.toggle('dark', darkMode.value);
      }else{
        localStorage.setItem('darkMode', false);
        document.documentElement.classList.toggle('dark', true);
      }

      // 初始化各种功能
      initParticles();
      initCursor();
      initAnimations();

      // 滚动事件监听
      window.addEventListener('scroll', checkScrollPosition);

      // 初始检查滚动位置
      checkScrollPosition();

      // 初始主题设置
      if (!darkMode.value) {
        document.body.classList.remove('dark');
        document.body.style.opacity = 1;
      }
    });

    // 清理
    onUnmounted(() => {
      window.removeEventListener('scroll', checkScrollPosition);
    });

    return {
      navLinks,
      activeSection,
      hoveredLink,
      mobileMenuOpen,
      darkMode,
      stats,
      skills,
      tags,
      circularSkills,
      experiences,
      projects,
      hoveredProject,
      socials,
      formData,
      cursorFollower,
      particlesCanvas,
      scrollTopBtn,
      progressBar,
      navbar,
      scrollToSection,
      closeMobileMenu,
      scrollToTop,
      toggleTheme,
      toggleMenu,
      checkScrollPosition
    };
  }
}).mount('#app');

const EMAILJS_PUBLIC_KEY = '5rVudJ9UsZmRsnAxf';
const EMAILJS_SERVICE_ID = 'service_teyi38r';
const EMAILJS_TEMPLATE_ID = 'template_g9m4d9h';

// 初始化 EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

const form = document.getElementById('contactForm');
const btn = document.getElementById('submitBtn');
const msgDiv = document.getElementById('formMsg');

form.addEventListener('submit', async function (e) {
  e.preventDefault(); // 阻止表单默认刷新页面

  // 蜜罐检测：如果隐藏字段被填了，说明是机器人，直接拦截
  if (this._honeypot.value) return;

  // 切换按钮加载状态
  const originalText = btn.innerText;
  btn.disabled = true;
  btn.innerText = '⏳ 发送中...';
  msgDiv.style.display = 'none';

  try {
    // 调用 EmailJS 发送表单数据
    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this);

    // 发送成功提示
    msgDiv.innerText = '✅ 消息已成功发送！我会在24小时内回复您。';
    msgDiv.style.display = 'block';
    msgDiv.style.background = '#f6ffed';
    msgDiv.style.color = '#52c41a';
    msgDiv.style.border = '1px solid #b7eb8f';
    this.reset(); // 清空表单

  } catch (error) {
    // 发送失败提示
    console.error('EmailJS Error:', error);
    msgDiv.innerText = '❌ 发送失败，请稍后重试或直接发邮件至：small_zhh@163.com';
    msgDiv.style.display = 'block';
    msgDiv.style.background = '#fff2f0';
    msgDiv.style.color = '#ff4d4f';
    msgDiv.style.border = '1px solid #ffccc7';
  } finally {
    // 恢复按钮状态
    btn.disabled = false;
    btn.innerText = originalText;
  }
});