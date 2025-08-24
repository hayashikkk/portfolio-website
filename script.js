// DOM要素の取得とナビゲーション機能
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        // ハンバーガーメニューの切り替え
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // ナビゲーションリンクのクリック時にメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });
}

// 幻想的な浮遊する光の玉を生成
function createFloatingLights() {
    const floatingLights = document.querySelector('.floating-lights');
    const colors = [
        'var(--primary-color)',
        'var(--aurora-muted)', 
        'var(--aurora-sage)',
        'var(--aurora-steel)',
        'var(--aurora-earth)',
        'var(--cosmic-bronze)'
    ];
    
    // 25個の光の玉を生成
    for (let i = 0; i < 25; i++) {
        const light = document.createElement('div');
        light.className = 'floating-light';
        
        const size = Math.random() * 6 + 3; // 3-9px
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 10 + 8; // 8-18s
        const delay = Math.random() * 5; // 0-5s
        
        light.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${left}%;
            top: ${top}%;
            opacity: 0.7;
            box-shadow: 0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color};
            animation: lightFloat ${duration}s ease-in-out infinite ${delay}s;
            pointer-events: none;
            filter: blur(0.5px);
        `;
        
        floatingLights.appendChild(light);
    }
}

// 星座のような連結線を描画
function createConstellations() {
    const floatingLights = document.querySelector('.floating-lights');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        opacity: 0.3;
    `;
    
    // ランダムな星座線を描画
    for (let i = 0; i < 8; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const x1 = Math.random() * 100;
        const y1 = Math.random() * 100;
        const x2 = Math.random() * 100;
        const y2 = Math.random() * 100;
        
        line.setAttribute('x1', x1 + '%');
        line.setAttribute('y1', y1 + '%');
        line.setAttribute('x2', x2 + '%');
        line.setAttribute('y2', y2 + '%');
        line.setAttribute('stroke', 'var(--primary-color)');
        line.setAttribute('stroke-width', '0.5');
        line.setAttribute('opacity', '0.3');
        
        // 線をアニメーション
        const length = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
        line.style.strokeDasharray = length;
        line.style.strokeDashoffset = length;
        line.style.animation = `drawLine 3s ease-in-out infinite ${i * 0.5}s`;
        
        svg.appendChild(line);
    }
    
    floatingLights.appendChild(svg);
}

// マウス追従エフェクト
function createMouseFollower() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // マウス周辺に光の効果を追加
        createMouseTrail(mouseX, mouseY);
    });
    
    // マウストレイル効果
    function createMouseTrail(x, y) {
        if (Math.random() > 0.8) { // 20%の確率で光を生成
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                box-shadow: 0 0 8px var(--primary-color);
                animation: trailFade 2s ease-out forwards;
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(trail);
            
            // 2秒後に削除
            setTimeout(() => {
                trail.remove();
            }, 2000);
        }
    }
}

// 幻想的な背景パルス効果
function createBackgroundPulse() {
    const fantasyBg = document.querySelector('.fantasy-background');
    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 1) % 360;
        fantasyBg.style.filter = `hue-rotate(${hue}deg)`;
    }, 100);
}

// 流れ星効果
function createShootingStars() {
    const stars = document.querySelector('.stars');
    
    setInterval(() => {
        if (Math.random() > 0.7) { // 30%の確率で流れ星
            const shootingStar = document.createElement('div');
            const startX = Math.random() * 100;
            const startY = Math.random() * 50; // 上半分から開始
            
            shootingStar.style.cssText = `
                position: absolute;
                left: ${startX}%;
                top: ${startY}%;
                width: 2px;
                height: 2px;
                background: var(--cosmic-pewter);
                border-radius: 50%;
                box-shadow: 0 0 6px var(--cosmic-pewter);
                animation: shootingStar 3s linear forwards;
                pointer-events: none;
            `;
            
            stars.appendChild(shootingStar);
            
            // 3秒後に削除
            setTimeout(() => {
                shootingStar.remove();
            }, 3000);
        }
    }, 2000);
}

// パーティクルクリック効果
function createClickEffect() {
    document.addEventListener('click', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // クリック時に爆発エフェクト
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            const angle = (i / 12) * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: var(--aurora-muted);
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                box-shadow: 0 0 8px var(--aurora-muted);
                animation: particleExplode 1s ease-out forwards;
                transform: translate(-50%, -50%);
            `;
            
            // パーティクルの移動をアニメーション
            particle.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(${endX - x - 2}px, ${endY - y - 2}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    });
}

// ナビゲーションの効果（ボックス効果なし）
function enhanceNavigation() {
    // ナビゲーションのホバー効果は既にCSSで設定済み
}

// シンプルな浮き上がりエフェクト
function createFloatUpEffect() {
    const mainTitle = document.getElementById('mainTitle');
    const subTitle = document.getElementById('subTitle');
    
    // 1秒後に浮き上がり開始
    setTimeout(() => {
        mainTitle.classList.add('animate');
        subTitle.classList.add('animate');
    }, 1000);
}

// タイトルのインタラクティブ効果
function enhanceTitleInteraction() {
    const centerTitle = document.querySelector('.center-title');
    const mainTitle = document.getElementById('mainTitle');
    const subTitle = document.getElementById('subTitle');
    
    // マウスホバー時の効果
    centerTitle.addEventListener('mouseenter', () => {
        mainTitle.style.animation = 'titleFloat 2s ease-in-out infinite, sparkleText 1.5s ease-in-out infinite';
        subTitle.style.transform = 'translateY(0) scale(1.1)';
        subTitle.style.color = 'var(--primary-color)';
    });
    
    centerTitle.addEventListener('mouseleave', () => {
        mainTitle.style.animation = 'titleFloat 6s ease-in-out infinite, sparkleText 3s ease-in-out infinite';
        subTitle.style.transform = 'translateY(0) scale(1)';
        subTitle.style.color = 'var(--text-secondary)';
    });
    
    
}

// マウスホイールでボタンを表示・非表示するアニメーション
function initWheelAnimations() {
    let isVisible = false;
    let wheelDelta = 0;
    let lastDirection = null;
    const THRESHOLD = 50;
    
    function handleWheel(e) {
        // ページスクロールを防止
        e.preventDefault();
        
        // ホイール方向を判定
        const wheelDirection = e.deltaY > 0 ? 'down' : 'up';
        
        // 方向が変わったらリセット
        if (lastDirection !== wheelDirection) {
            wheelDelta = 0;
            lastDirection = wheelDirection;
        }
        
        // 累積値を増やす（方向に関係なく）
        wheelDelta += Math.abs(e.deltaY);
        
        if (wheelDirection === 'down' && wheelDelta >= THRESHOLD && !isVisible) {
            // 下スクロール: 閾値到達で表示
            isVisible = true;
            wheelDelta = 0; // リセット
            showButtons();
        } else if (wheelDirection === 'up' && wheelDelta >= THRESHOLD && isVisible) {
            // 上スクロール: 閾値到達で非表示
            isVisible = false;
            wheelDelta = 0; // リセット
            hideButtons();
        }
    }
    
    function showButtons() {
        // 順番にボタンをアニメーション表示
        setTimeout(() => {
            const aboutBtn = document.querySelector('.nav-btn-about');
            aboutBtn?.classList.add('scroll-animate');
        }, 200);
        
        setTimeout(() => {
            const projectsBtn = document.querySelector('.nav-btn-projects');
            projectsBtn?.classList.add('scroll-animate');
        }, 400);
        
        setTimeout(() => {
            const contactBtn = document.querySelector('.nav-btn-contact');
            contactBtn?.classList.add('scroll-animate');
        }, 600);
    }
    
    function hideButtons() {
        // 全ボタンを即座に非表示
        document.querySelector('.nav-btn-about')?.classList.remove('scroll-animate');
        document.querySelector('.nav-btn-projects')?.classList.remove('scroll-animate');
        document.querySelector('.nav-btn-contact')?.classList.remove('scroll-animate');
    }
    
    // ホイールイベント追加（ホームページのみ）
    if (document.querySelector('.nav-buttons')) {
        window.addEventListener('wheel', handleWheel, { passive: false });
    }
}

// ナビゲーションボタンのスムーズトランジション
function enhanceNavigationButtons() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const href = button.getAttribute('href');
            
            // フェードアウト効果
            document.body.style.transition = 'opacity 0.5s ease-out';
            document.body.style.opacity = '0';
            
            // 0.5秒後にページ遷移
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
        
        // ボタンにパーティクル効果を追加
        button.addEventListener('mouseenter', () => {
            createButtonParticles(button);
        });
    });
}

// ボタン周辺にパーティクル効果を生成
function createButtonParticles(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const angle = (i / 8) * Math.PI * 2;
        const distance = 30;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 3px;
            height: 3px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
            box-shadow: 0 0 6px var(--primary-color);
            opacity: 0.8;
            transform: translate(-50%, -50%);
        `;
        
        // パーティクルアニメーション
        particle.animate([
            { 
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 0.8
            },
            { 
                transform: `translate(${endX - centerX - 1.5}px, ${endY - centerY - 1.5}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        });
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
}

// 初期化関数
function initializeEffects() {
    // 幻想的エフェクトが存在する場合のみ実行
    const fantasyBg = document.querySelector('.fantasy-background');
    if (fantasyBg) {
        createFloatingLights();
        createConstellations();
        createMouseFollower();
        createBackgroundPulse();
        createShootingStars();
        createClickEffect();
        
        // ホームページのタイトルエフェクト
        const mainTitle = document.getElementById('mainTitle');
        const subTitle = document.getElementById('subTitle');
        if (mainTitle && subTitle) {
            createFloatUpEffect();
            enhanceTitleInteraction();
        }
        
        // ナビゲーションボタンのエフェクト
        enhanceNavigationButtons();
        
        // ホイールアニメーション初期化
        initWheelAnimations();
    }
}

// ページ初期化
document.addEventListener('DOMContentLoaded', () => {
    // ナビゲーション初期化（全ページ共通）
    initializeNavigation();
    
    // ローディング効果
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // エフェクト初期化
    setTimeout(() => {
        initializeEffects();
        enhanceNavigation();
    }, 500);
});

// CSSアニメーションを動的に追加
const style = document.createElement('style');
style.textContent = `
    @keyframes drawLine {
        0% { stroke-dashoffset: 100%; }
        50% { stroke-dashoffset: 0%; }
        100% { stroke-dashoffset: -100%; }
    }
    
    @keyframes trailFade {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
    }
    
    @keyframes shootingStar {
        0% { 
            transform: translateX(0) translateY(0) scale(1);
            opacity: 1;
        }
        100% { 
            transform: translateX(200px) translateY(200px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes particleExplode {
        0% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% { 
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);