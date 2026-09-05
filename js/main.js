<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Adrian — 個人サイト</title>
<meta name="description" content="Adrianの個人サイト。ウェブサイトやUI、ゲームなど、いろいろ試しながら学んでいるものを置いています。">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>

<body>

<a class="skip-link" href="#home">本文へスキップ</a>

<header class="site-header">
  <div class="nav-shell">
    <nav class="glass nav-pill" aria-label="メインナビゲーション">

      <a href="#home" class="nav-mark">Adrian</a>

      <ul class="nav-links">
        <li>
          <a href="#home">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 11.5 12 4l8 7.5"/>
              <path d="M6 10v9h12v-9"/>
            </svg>
            ホーム
          </a>
        </li>

        <li>
          <a href="#about">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="3.4"/>
              <path d="M5 19c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4"/>
            </svg>
            自己紹介
          </a>
        </li>

        <li>
          <a href="#projects">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 7.5h5l1.6 2H20a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1Z"/>
            </svg>
            制作物
          </a>
        </li>

        <li>
          <a href="#contact">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3.5" y="6" width="17" height="12" rx="2"/>
              <path d="m4 7.5 8 6 8-6"/>
            </svg>
            お問い合わせ
          </a>
        </li>
      </ul>

      <button
        class="nav-toggle"
        id="navToggle"
        aria-expanded="false"
        aria-controls="mobileMenu"
        aria-label="メニューを開く"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </nav>
  </div>

  <div class="mobile-menu glass" id="mobileMenu" hidden>
    <ul>
      <li><a href="#home">ホーム</a></li>
      <li><a href="#about">自己紹介</a></li>
      <li><a href="#projects">制作物</a></li>
      <li><a href="#contact">お問い合わせ</a></li>
    </ul>
  </div>
</header>


<main id="home">

  <!-- HERO -->
  <section class="hero" id="home-section">

    <div class="hero-copy">

      <p class="eyebrow-pill glass">
        <span class="eyebrow-dot" aria-hidden="true"></span>
        個人で気ままに制作中
      </p>

      <h1>
        こんにちは、<br>
        Adrianです。
      </h1>

      <p class="hero-role">
        学びながら、つくっています
      </p>

      <p class="hero-intro">
        ウェブサイトやUI、ゲームなど、インターネット上でいろんなものを作るのが好きです。
        まだ勉強中なので、作っては壊し、直してまた作る——そうやって学んでいます。
      </p>

      <ul class="hero-tags">

        <li class="glass">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m9 8-4 4 4 4"/>
            <path d="m15 8 4 4-4 4"/>
          </svg>
          HTML &amp; CSS
        </li>

        <li class="glass">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>
          </svg>
          JavaScript
        </li>

      </ul>

      <div class="hero-actions">
        <a href="#projects" class="btn btn-primary">
          作ったものを見る
        </a>

        <a href="#contact" class="btn btn-ghost glass">
          挨拶する
        </a>
      </div>

    </div>


    <div class="hero-media">

      <div class="hero-media-glow" aria-hidden="true"></div>

      <div class="hero-image-frame glass">
        <img
          src="assets/profile.webp"
          alt="Adrianの写真"
          class="protected-img"
          draggable="false"
        >
      </div>

    </div>

  </section>


  <!-- ABOUT -->
  <section class="about" id="about">

    <div class="section-heading">
      <h2>自己紹介</h2>
    </div>

    <div class="about-grid">

      <p class="about-text">
        インターネット上でものを作るのが好きな人間です。ウェブサイトやUI、ゲーム、
        ちょっとした実験的な制作物をいろいろ試しています。まだまだ手探りなので、
        作っているものの多くは「とりあえずやってみて、どうなるか見てみる」という
        段階のものばかりです。

        <br><br>

        実際に手を動かして作ることで一番学べるタイプなので、途中で壊れたり、
        見た目が変になったり、作り直しが必要になったりする部分も、大事な過程だと思っています。
      </p>

      <ul class="skills-list">
        <li class="glass">HTML &amp; CSS</li>
        <li class="glass">JavaScript</li>
      </ul>

    </div>

  </section>


  <!-- DYNAMIC PROJECTS -->
  <section class="projects" id="projects">

    <div class="section-heading">
      <h2>制作物</h2>
    </div>

    <div class="project-slider" id="projectSlider">
      <div class="project-track" id="projectTrack"></div>
    </div>

    <div
      class="project-slider-controls"
      id="projectControls"
      hidden
    >
      <button
        type="button"
        class="project-slider-btn"
        id="projectPrev"
        aria-label="前の制作物"
      >
        ‹
      </button>

      <button
        type="button"
        class="project-slider-btn"
        id="projectNext"
        aria-label="次の制作物"
      >
        ›
      </button>
    </div>

    <p
      class="projects-loading"
      id="projectsLoading"
    >
      読み込み中…
    </p>

  </section>


  <!-- CONTACT -->
  <section class="contact" id="contact">

    <div class="contact-card glass">

      <h2>お問い合わせ</h2>

      <p>
        挨拶したい方は、下のメールかInstagramからどうぞ。
        <br>
        このサイトでは制作依頼(フリーランス案件)は受け付けていません。ここはあくまで自分の小さな場所です。
      </p>

      <a
        class="contact-email"
        href="mailto:yoshkiadityawork@hotmail.com"
      >
        yoshkiadityawork@hotmail.com
      </a>

      <ul class="social-links">
        <li>
          <a
            href="https://www.instagram.com/kreidehuter"
            target="_blank"
            rel="noopener noreferrer"
          >
            @kreidehuter
          </a>
        </li>
      </ul>

    </div>

  </section>

</main>


<footer class="site-footer">
  <p>
    © <span id="year"></span> Adrian. すべて自分で作りました。
  </p>
</footer>


<script src="js/main.js"></script>

</body>
</html>
