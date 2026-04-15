document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const mobileMedia = window.matchMedia('(max-width: 720px)');
  const revealTargets = document.querySelectorAll(
    '.section, .site-footer, .info-card, .feature-card, .benefit-item, .example-card, .team-card, .pricing-card, .hero-panel'
  );

  revealTargets.forEach((element, index) => {
    element.classList.add('reveal-on-scroll');
    element.style.transitionDelay = `${Math.min(index * 0.06, 0.36)}s`;
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealTargets.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealTargets.forEach((element) => {
      element.classList.add('is-visible');
    });
  }

  const syncHeaderState = () => {
    if (!header) {
      return;
    }

    const shouldCondense = mobileMedia.matches && window.scrollY > 12;
    header.classList.toggle('is-condensed', shouldCondense);
  };

  syncHeaderState();
  window.addEventListener('scroll', syncHeaderState, { passive: true });
  mobileMedia.addEventListener('change', syncHeaderState);

  const localeToggle = document.getElementById('locale-toggle');
  const form = document.getElementById('request-form');
  const status = document.getElementById('form-status');
  const submitButton = form?.querySelector('button[type="submit"]') || null;
  const labelNodes = {
    name: form?.querySelector('label:nth-of-type(1)'),
    contact: form?.querySelector('label:nth-of-type(2)'),
  };
  const textSelectors = [
    'title',
    '.brand-tagline',
    '.site-nav a:nth-of-type(1)',
    '.site-nav a:nth-of-type(2)',
    '.site-nav a:nth-of-type(3)',
    '.site-nav a:nth-of-type(4)',
    '.hero .eyebrow',
    '.hero h1',
    '.hero-text',
    '.hero-actions .button-primary',
    '.hero-actions .button-secondary',
    '.hero-panel .metric-card span',
    '.hero-panel .metric-card p',
    '.hero-panel .metric-grid article:nth-of-type(1) span',
    '.hero-panel .metric-grid article:nth-of-type(2) span',
    '.hero-panel .metric-grid article:nth-of-type(3) span',
    '.hero-panel .metric-grid article:nth-of-type(4) span',
    'main > section:nth-of-type(2) .eyebrow',
    'main > section:nth-of-type(2) h2',
    'main > section:nth-of-type(2) .info-card:nth-of-type(1) strong',
    'main > section:nth-of-type(2) .info-card:nth-of-type(1) p',
    'main > section:nth-of-type(2) .info-card:nth-of-type(2) strong',
    'main > section:nth-of-type(2) .info-card:nth-of-type(2) p',
    'main > section:nth-of-type(2) .info-card:nth-of-type(3) strong',
    'main > section:nth-of-type(2) .info-card:nth-of-type(3) p',
    'main > section:nth-of-type(2) .info-card:nth-of-type(4) strong',
    'main > section:nth-of-type(2) .info-card:nth-of-type(4) p',
    'main > section:nth-of-type(3) .eyebrow',
    'main > section:nth-of-type(3) h2',
    'main > section:nth-of-type(3) .feature-card:nth-of-type(1) h3',
    'main > section:nth-of-type(3) .feature-card:nth-of-type(1) p',
    'main > section:nth-of-type(3) .feature-card:nth-of-type(2) h3',
    'main > section:nth-of-type(3) .feature-card:nth-of-type(2) p',
    'main > section:nth-of-type(3) .feature-card:nth-of-type(3) h3',
    'main > section:nth-of-type(3) .feature-card:nth-of-type(3) p',
    'main > section:nth-of-type(3) .feature-card:nth-of-type(4) h3',
    'main > section:nth-of-type(3) .feature-card:nth-of-type(4) p',
    'main > section:nth-of-type(3) .feature-card:nth-of-type(5) h3',
    'main > section:nth-of-type(3) .feature-card:nth-of-type(5) p',
    'main > section:nth-of-type(4) .eyebrow',
    'main > section:nth-of-type(4) h2',
    'main > section:nth-of-type(4) .benefit-item:nth-of-type(1) p',
    'main > section:nth-of-type(4) .benefit-item:nth-of-type(2) p',
    'main > section:nth-of-type(4) .benefit-item:nth-of-type(3) p',
    'main > section:nth-of-type(4) .benefit-item:nth-of-type(4) p',
    'main > section:nth-of-type(4) .benefit-item:nth-of-type(5) p',
    'main > section:nth-of-type(4) .benefit-item:nth-of-type(6) p',
    'main > section:nth-of-type(5) .eyebrow',
    'main > section:nth-of-type(5) h2',
    'main > section:nth-of-type(5) th:nth-of-type(1)',
    'main > section:nth-of-type(5) th:nth-of-type(2)',
    'main > section:nth-of-type(5) tbody tr:nth-of-type(1) td:nth-of-type(1)',
    'main > section:nth-of-type(5) tbody tr:nth-of-type(1) td:nth-of-type(2)',
    'main > section:nth-of-type(5) tbody tr:nth-of-type(2) td:nth-of-type(1)',
    'main > section:nth-of-type(5) tbody tr:nth-of-type(2) td:nth-of-type(2)',
    'main > section:nth-of-type(5) tbody tr:nth-of-type(3) td:nth-of-type(1)',
    'main > section:nth-of-type(5) tbody tr:nth-of-type(3) td:nth-of-type(2)',
    'main > section:nth-of-type(5) .pricing-note',
    'main > section:nth-of-type(6) .eyebrow',
    'main > section:nth-of-type(6) h2',
    'main > section:nth-of-type(6) .example-card p',
    'main > section:nth-of-type(7) .eyebrow',
    'main > section:nth-of-type(7) h2',
    'main > section:nth-of-type(7) .team-card:nth-of-type(1) p',
    'main > section:nth-of-type(7) .team-card:nth-of-type(2) p',
    'main > section:nth-of-type(7) .team-card:nth-of-type(3) p',
    'main > section:nth-of-type(7) .team-card:nth-of-type(4) p',
    'main > section:nth-of-type(7) .team-card:nth-of-type(5) p',
    'main > section:nth-of-type(7) .team-card:nth-of-type(6) p',
    '.footer-copy .eyebrow',
    '.footer-copy h2',
    '.footer-copy p:nth-of-type(2)',
    '.footer-copy p:nth-of-type(3)',
    '.footer-copy p:nth-of-type(4) a',
  ];
  const placeholderSelectors = [
    'input[name="name"]',
    'input[name="contact"]',
  ];
  const originalText = new Map();
  const originalPlaceholders = new Map();

  textSelectors.forEach((selector) => {
    const element = selector === 'title' ? document.querySelector('title') : document.querySelector(selector);
    if (element) {
      originalText.set(selector, element.textContent);
    }
  });

  placeholderSelectors.forEach((selector) => {
    const element = document.querySelector(selector);
    if (element) {
      originalPlaceholders.set(selector, element.getAttribute('placeholder') || '');
    }
  });

  const originalLabels = {
    name: labelNodes.name?.childNodes[0]?.textContent || '',
    contact: labelNodes.contact?.childNodes[0]?.textContent || '',
  };

  const translations = {
    en: {
      text: {
        title: 'DogChain',
        '.brand-tagline': 'Transparent dog transportation on blockchain',
        '.site-nav a:nth-of-type(1)': 'About',
        '.site-nav a:nth-of-type(2)': 'How it works',
        '.site-nav a:nth-of-type(3)': 'Pricing',
        '.site-nav a:nth-of-type(4)': 'Contacts',
        '.hero .eyebrow': 'Blockchain + IoT for agrologistics',
        '.hero h1': 'Blockchain for animal transport',
        '.hero-text': 'A digital platform with smart contracts and IoT sensors. Transparent. Safe. Automatic.',
        '.hero-actions .button-primary': 'Request a demo',
        '.hero-actions .button-secondary': 'Learn more',
        '.hero-panel .metric-card span': 'In-transit monitoring',
        '.hero-panel .metric-card p': 'Temperature, humidity, GPS, and documents in one unified registry.',
        '.hero-panel .metric-grid article:nth-of-type(1) span': 'saved on paperwork',
        '.hero-panel .metric-grid article:nth-of-type(2) span': 'for settlements instead of weeks of waiting',
        '.hero-panel .metric-grid article:nth-of-type(3) span': 'fewer disputes and conflicts',
        '.hero-panel .metric-grid article:nth-of-type(4) span': 'continuous transport condition monitoring',
        'main > section:nth-of-type(2) .eyebrow': 'Problem',
        'main > section:nth-of-type(2) h2': 'Dog transportation in Belarus faces serious problems',
        'main > section:nth-of-type(2) .info-card:nth-of-type(1) strong': 'Dogs are transported blindly',
        'main > section:nth-of-type(2) .info-card:nth-of-type(1) p': 'Belarus has no unified standards for transporting dogs. Owners do not know the actual travel conditions of their pets.',
        'main > section:nth-of-type(2) .info-card:nth-of-type(2) strong': 'Violations are treated as normal',
        'main > section:nth-of-type(2) .info-card:nth-of-type(2) p': 'Fake veterinary documents, transport in luggage compartments without airflow or water, and trips in dangerous heat or cold. It is almost impossible to prove violations.',
        'main > section:nth-of-type(2) .info-card:nth-of-type(3) strong': 'There is no dedicated pet taxi market',
        'main > section:nth-of-type(2) .info-card:nth-of-type(3) p': 'There is no specialized market. Private carriers work without guarantees and without a trustworthy rating. Owners are forced to take risks.',
        'main > section:nth-of-type(2) .info-card:nth-of-type(4) strong': 'No evidence means disputes are hard to win',
        'main > section:nth-of-type(2) .info-card:nth-of-type(4) p': 'In 2024-2025 there were more than 150 reports of violations on social media, but only a few reached court because there was no objective data.',
        'main > section:nth-of-type(3) .eyebrow': 'Solution',
        'main > section:nth-of-type(3) h2': 'How DogChain works',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(1) h3': 'Digital dog passport',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(1) p': 'Chip data, vaccinations, veterinary documents, and export permits are stored on blockchain and cannot be forged.',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(2) h3': 'Real-time IoT monitoring',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(2) p': 'Temperature, humidity, CO2, and GPS sensors record everything. Any deviation is visible immediately.',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(3) h3': 'Automatic payments',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(3) p': 'Funds are locked in a smart contract. The carrier is paid only after safe delivery is confirmed.',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(4) h3': 'Carrier ratings',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(4) p': 'A fair rating based on blockchain data that cannot be artificially inflated.',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(5) h3': 'Insurance integration',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(5) p': 'Insurers receive objective data, so claim payouts are faster and require fewer manual checks.',
        'main > section:nth-of-type(4) .eyebrow': 'Benefits',
        'main > section:nth-of-type(4) h2': 'What you get',
        'main > section:nth-of-type(4) .benefit-item:nth-of-type(1) p': 'Transparency: all data is on blockchain, so tampering is excluded.',
        'main > section:nth-of-type(4) .benefit-item:nth-of-type(2) p': 'Lower operating costs: documents are processed 70% faster.',
        'main > section:nth-of-type(4) .benefit-item:nth-of-type(3) p': 'Fast settlements: payment in one hour instead of 30-45 days.',
        'main > section:nth-of-type(4) .benefit-item:nth-of-type(4) p': 'Fewer disputes: conflicts drop by 80% because every event is recorded.',
        'main > section:nth-of-type(4) .benefit-item:nth-of-type(5) p': 'Dog welfare protection: monitoring temperature, air quality, and stress.',
        'main > section:nth-of-type(4) .benefit-item:nth-of-type(6) p': 'Data for regulators: veterinary control and customs receive updates automatically.',
        'main > section:nth-of-type(5) .eyebrow': 'Pricing',
        'main > section:nth-of-type(5) h2': 'Simple and transparent pricing',
        'main > section:nth-of-type(5) th:nth-of-type(1)': 'Service',
        'main > section:nth-of-type(5) th:nth-of-type(2)': 'Price',
        'main > section:nth-of-type(5) tbody tr:nth-of-type(1) td:nth-of-type(1)': 'Annual subscription for pet taxi operators',
        'main > section:nth-of-type(5) tbody tr:nth-of-type(1) td:nth-of-type(2)': '300-900 BYN / year',
        'main > section:nth-of-type(5) tbody tr:nth-of-type(2) td:nth-of-type(1)': 'IoT sensor rental (kit)',
        'main > section:nth-of-type(5) tbody tr:nth-of-type(2) td:nth-of-type(2)': '100 BYN / month',
        'main > section:nth-of-type(5) tbody tr:nth-of-type(3) td:nth-of-type(1)': 'Automatic payment processing fee',
        'main > section:nth-of-type(5) tbody tr:nth-of-type(3) td:nth-of-type(2)': '0.5-1% of transaction amount',
        'main > section:nth-of-type(5) .pricing-note': 'Free pilot period: test the platform without payment.',
        'main > section:nth-of-type(6) .eyebrow': 'Global context',
        'main > section:nth-of-type(6) h2': 'There are no direct equivalents in the world.',
        'main > section:nth-of-type(6) .example-card p': 'the first project in this niche!',
        'main > section:nth-of-type(7) .eyebrow': 'Team',
        'main > section:nth-of-type(7) h2': 'Who is building the project',
        'main > section:nth-of-type(7) .team-card:nth-of-type(1) p': 'Project management',
        'main > section:nth-of-type(7) .team-card:nth-of-type(2) p': 'IT development',
        'main > section:nth-of-type(7) .team-card:nth-of-type(3) p': 'Analytics',
        'main > section:nth-of-type(7) .team-card:nth-of-type(4) p': 'Finance',
        'main > section:nth-of-type(7) .team-card:nth-of-type(5) p': 'Coach consultant',
        'main > section:nth-of-type(7) .team-card:nth-of-type(6) p': 'Coach consultant',
        '.footer-copy .eyebrow': 'Contacts',
        '.footer-copy h2': 'Leave a request for a pilot launch',
        '.footer-copy p:nth-of-type(2)': 'Email:  l0002422@g.bstu.by',
        '.footer-copy p:nth-of-type(3)': 'Phone:  +375297808374',
        '.footer-copy p:nth-of-type(4) a': 'Download the startup document',
      },
      placeholders: {
        'input[name="name"]': 'Your name',
        'input[name="contact"]': '+375... or email',
      },
      labels: {
        name: 'Name',
        contact: 'Phone / Email',
      },
      button: {
        idle: 'Send',
        pending: 'Sending...',
      },
      status: {
        missingKeys: 'Set YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, and YOUR_PUBLIC_KEY in index.html to enable submission.',
        sending: 'Sending your request...',
        success: 'Your request has been sent successfully. We will contact you shortly.',
        errorFallback: 'Could not send the request. Check your EmailJS keys and template settings.',
        errorPrefix: 'Could not send the request:',
      },
      localeButton: 'RU',
      htmlLang: 'en',
    },
  };

  let currentLocale = localStorage.getItem('locale') === 'en' ? 'en' : 'ru';

  const updateLabelText = (label, value) => {
    if (label?.childNodes[0]) {
      label.childNodes[0].textContent = `${value}\n          `;
    }
  };

  const applyLocale = (locale) => {
    const isEnglish = locale === 'en';
    const localeText = isEnglish ? translations.en.text : null;
    const localePlaceholders = isEnglish ? translations.en.placeholders : null;
    const localeLabels = isEnglish ? translations.en.labels : null;
    const emailLine = document.querySelector('.footer-copy p:nth-of-type(2)');
    const phoneLine = document.querySelector('.footer-copy p:nth-of-type(3)');

    textSelectors.forEach((selector) => {
      const element = selector === 'title' ? document.querySelector('title') : document.querySelector(selector);
      if (!element) {
        return;
      }

      element.textContent = isEnglish ? localeText[selector] : originalText.get(selector);
    });

    placeholderSelectors.forEach((selector) => {
      const element = document.querySelector(selector);
      if (!element) {
        return;
      }

      element.setAttribute('placeholder', isEnglish ? localePlaceholders[selector] : originalPlaceholders.get(selector));
    });

    updateLabelText(labelNodes.name, isEnglish ? localeLabels.name : originalLabels.name);
    updateLabelText(labelNodes.contact, isEnglish ? localeLabels.contact : originalLabels.contact);

    if (submitButton && !submitButton.disabled) {
      submitButton.textContent = isEnglish ? translations.en.button.idle : 'Отправить';
    }

    if (localeToggle) {
      localeToggle.textContent = isEnglish ? translations.en.localeButton : 'EN';
      localeToggle.setAttribute(
        'aria-label',
        isEnglish ? 'Переключить язык интерфейса на русский' : 'Switch interface language to English'
      );
    }

    if (emailLine) {
      emailLine.innerHTML = isEnglish
        ? 'Email: <a href="mailto:l0002422@g.bstu.by"> l0002422@g.bstu.by</a>'
        : 'Email: <a href="mailto:l0002422@g.bstu.by"> l0002422@g.bstu.by</a>';
    }

    if (phoneLine) {
      phoneLine.innerHTML = isEnglish
        ? 'Phone: <a href="tel:+375297808374"> +375297808374</a>'
        : 'Телефон: <a href="tel:+375297808374"> +375297808374</a>';
    }

    document.documentElement.lang = isEnglish ? translations.en.htmlLang : 'ru';
    currentLocale = locale;
    localStorage.setItem('locale', locale);
  };

  localeToggle?.addEventListener('click', () => {
    applyLocale(currentLocale === 'ru' ? 'en' : 'ru');
  });

  applyLocale(currentLocale);

  if (!form || !window.emailjs) {
    return;
  }

  const serviceId = form.dataset.serviceId;
  const templateId = form.dataset.templateId;
  const publicKey = form.dataset.publicKey;

  const getLocaleMessages = () => {
    if (currentLocale === 'en') {
      return translations.en;
    }

    return {
      button: {
        idle: 'Отправить',
        pending: 'Отправка...',
      },
      status: {
        missingKeys: 'Укажите YOUR_SERVICE_ID, YOUR_TEMPLATE_ID и YOUR_PUBLIC_KEY в index.html, чтобы включить отправку.',
        sending: 'Отправляем заявку...',
        success: 'Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.',
        errorFallback: 'Не удалось отправить заявку. Проверьте ключи EmailJS и настройки шаблона.',
        errorPrefix: 'Не удалось отправить заявку:',
      },
    };
  };

  const setStatus = (message, type = '') => {
    if (!status) {
      return;
    }

    status.textContent = message;
    status.className = `form-status ${type}`.trim();
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const localeMessages = getLocaleMessages();

    if (!serviceId || !templateId || !publicKey || serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
      setStatus(localeMessages.status.missingKeys, 'is-error');
      return;
    }

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = localeMessages.button.pending;
      }

      setStatus(localeMessages.status.sending, 'is-pending');

      await emailjs.sendForm(serviceId, templateId, form, {
        publicKey,
      });

      form.reset();
      setStatus(localeMessages.status.success, 'is-success');
    } catch (error) {
      console.error('EmailJS error:', error);
      const details = error?.text || error?.message || '';
      const message = details
        ? `${localeMessages.status.errorPrefix} ${details}`
        : localeMessages.status.errorFallback;
      setStatus(message, 'is-error');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = getLocaleMessages().button.idle;
      }
    }
  });
});
