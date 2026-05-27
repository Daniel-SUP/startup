document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const mobileMedia = window.matchMedia('(max-width: 720px)');
  const revealTargets = document.querySelectorAll(
    '.section, .site-footer, .info-card, .feature-card, .benefit-item, .example-card, .team-card, .pricing-card, .hero-panel'
  );

  revealTargets.forEach((element) => {
    element.classList.add('reveal-on-scroll');
  });

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
  const emailLine = document.querySelector('.footer-copy p:nth-of-type(2)');
  const phoneLine = document.querySelector('.footer-copy p:nth-of-type(3)');
  const emailLink = emailLine?.querySelector('a') || null;
  const phoneLink = phoneLine?.querySelector('a') || null;
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
    'main > section:nth-of-type(4) .eyebrow',
    'main > section:nth-of-type(4) h2',
    'main > section:nth-of-type(4) .step-card:nth-of-type(1) span',
    'main > section:nth-of-type(4) .step-card:nth-of-type(1) h3',
    'main > section:nth-of-type(4) .step-card:nth-of-type(1) p',
    'main > section:nth-of-type(4) .step-card:nth-of-type(2) span',
    'main > section:nth-of-type(4) .step-card:nth-of-type(2) h3',
    'main > section:nth-of-type(4) .step-card:nth-of-type(2) p',
    'main > section:nth-of-type(4) .step-card:nth-of-type(3) span',
    'main > section:nth-of-type(4) .step-card:nth-of-type(3) h3',
    'main > section:nth-of-type(4) .step-card:nth-of-type(3) p',
    'main > section:nth-of-type(4) .step-card:nth-of-type(4) span',
    'main > section:nth-of-type(4) .step-card:nth-of-type(4) h3',
    'main > section:nth-of-type(4) .step-card:nth-of-type(4) p',
    'main > section:nth-of-type(4) .step-card:nth-of-type(5) span',
    'main > section:nth-of-type(4) .step-card:nth-of-type(5) h3',
    'main > section:nth-of-type(4) .step-card:nth-of-type(5) p',
    'main > section:nth-of-type(4) .step-card:nth-of-type(6) span',
    'main > section:nth-of-type(4) .step-card:nth-of-type(6) h3',
    'main > section:nth-of-type(4) .step-card:nth-of-type(6) p',
    'main > section:nth-of-type(5) .eyebrow',
    'main > section:nth-of-type(5) h2',
    'main > section:nth-of-type(5) .benefit-item:nth-of-type(1) p',
    'main > section:nth-of-type(5) .benefit-item:nth-of-type(2) p',
    'main > section:nth-of-type(5) .benefit-item:nth-of-type(3) p',
    'main > section:nth-of-type(5) .benefit-item:nth-of-type(4) p',
    'main > section:nth-of-type(6) .eyebrow',
    'main > section:nth-of-type(6) h2',
    'main > section:nth-of-type(6) th:nth-of-type(1)',
    'main > section:nth-of-type(6) th:nth-of-type(2)',
    'main > section:nth-of-type(6) th:nth-of-type(3)',
    'main > section:nth-of-type(6) tbody tr:nth-of-type(1) td:nth-of-type(1)',
    'main > section:nth-of-type(6) tbody tr:nth-of-type(1) td:nth-of-type(2)',
    'main > section:nth-of-type(6) tbody tr:nth-of-type(1) td:nth-of-type(3)',
    'main > section:nth-of-type(6) tbody tr:nth-of-type(2) td:nth-of-type(1)',
    'main > section:nth-of-type(6) tbody tr:nth-of-type(2) td:nth-of-type(2)',
    'main > section:nth-of-type(6) tbody tr:nth-of-type(2) td:nth-of-type(3)',
    'main > section:nth-of-type(6) tbody tr:nth-of-type(3) td:nth-of-type(1)',
    'main > section:nth-of-type(6) tbody tr:nth-of-type(3) td:nth-of-type(2)',
    'main > section:nth-of-type(6) tbody tr:nth-of-type(3) td:nth-of-type(3)',
    'main > section:nth-of-type(6) .pricing-note',
    'main > section:nth-of-type(7) .eyebrow',
    'main > section:nth-of-type(7) h2',
    'main > section:nth-of-type(7) .benefit-item:nth-of-type(1) p',
    'main > section:nth-of-type(7) .benefit-item:nth-of-type(2) p',
    'main > section:nth-of-type(7) .benefit-item:nth-of-type(3) p',
    'main > section:nth-of-type(7) .benefit-item:nth-of-type(4) p',
    'main > section:nth-of-type(7) .benefit-item:nth-of-type(5) p',
    'main > section:nth-of-type(7) .benefit-item:nth-of-type(6) p',
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
  const originalContacts = {
    emailText: emailLink?.textContent?.trim() || '',
    emailHref: emailLink?.getAttribute('href') || '',
    phoneText: phoneLink?.textContent?.trim() || '',
    phoneHref: phoneLink?.getAttribute('href') || '',
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
        '.hero h1': 'DogChain is a provable transportation of dogs on the blockchain.',
        '.hero-text': 'We record the temperature, route and conditions on the way. Money to the carrier is only when everything is fine.',
        '.hero-actions .button-primary': 'Request a demo',
        '.hero-actions .button-secondary': 'Learn more',
        '.hero-panel .metric-card span': 'In-transit monitoring',
        '.hero-panel .metric-card p': 'Temperature, GPS, and documents in one unified registry.',
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
        'main > section:nth-of-type(3) .eyebrow': 'Tragedies',
        'main > section:nth-of-type(3) h2': 'Real cases that could have been prevented',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(1) h3': '2020, Kyiv — Toronto',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(1) p': '500 puppies in the heat. 38 died. The carrier fled. It was impossible to help the dogs — no one knew what conditions they were in.',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(2) h3': '2024, Italy',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(2) p': '11–18 dogs suffocated in a minibus. Owners paid. Insurance refused. No way to prove the carrier wrong.',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(3) h3': '2024, Phuket — Saint Petersburg',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(3) p': 'Frank the pug froze in the luggage compartment. Customs said the dog was healthy when it left. How to prove otherwise?',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(4) h3': 'What do they have in common?',
        'main > section:nth-of-type(3) .feature-card:nth-of-type(4) p': 'It\'s impossible to prove fault. Owners only have their words. DogChain leaves unforgeable records of every moment.',
        'main > section:nth-of-type(4) .eyebrow': 'How it works',
        'main > section:nth-of-type(4) h2': 'The process in six steps',
        'main > section:nth-of-type(4) .step-card:nth-of-type(1) span': '01',
        'main > section:nth-of-type(4) .step-card:nth-of-type(1) h3': 'Creating an order',
        'main > section:nth-of-type(4) .step-card:nth-of-type(1) p': 'Owner creates an order and selects a carrier from the rating.',
        'main > section:nth-of-type(4) .step-card:nth-of-type(2) span': '02',
        'main > section:nth-of-type(4) .step-card:nth-of-type(2) h3': 'Payment locked',
        'main > section:nth-of-type(4) .step-card:nth-of-type(2) p': 'Funds are frozen in a smart contract. No one can touch them until the trip is over.',
        'main > section:nth-of-type(4) .step-card:nth-of-type(3) span': '03',
        'main > section:nth-of-type(4) .step-card:nth-of-type(3) h3': 'Equipping with sensors',
        'main > section:nth-of-type(4) .step-card:nth-of-type(3) p': 'Carrier rents a sensor (GPS + temperature) and an RFID collar for the dog.',
        'main > section:nth-of-type(4) .step-card:nth-of-type(4) span': '04',
        'main > section:nth-of-type(4) .step-card:nth-of-type(4) h3': 'Real-time monitoring',
        'main > section:nth-of-type(4) .step-card:nth-of-type(4) p': 'Owner sees the route, temperature, and humidity in real-time on the phone.',
        'main > section:nth-of-type(4) .step-card:nth-of-type(5) span': '05',
        'main > section:nth-of-type(4) .step-card:nth-of-type(5) h3': 'Checking on arrival',
        'main > section:nth-of-type(4) .step-card:nth-of-type(5) p': 'Upon delivery, the smart contract automatically checks all sensor data.',
        'main > section:nth-of-type(4) .step-card:nth-of-type(6) span': '06',
        'main > section:nth-of-type(4) .step-card:nth-of-type(6) h3': 'Payment or freeze',
        'main > section:nth-of-type(4) .step-card:nth-of-type(6) p': 'If all is well — payment to carrier within an hour. If violation — funds frozen.',
        'main > section:nth-of-type(5) .eyebrow': 'Technology',
        'main > section:nth-of-type(5) h2': 'Reliable infrastructure',
        'main > section:nth-of-type(5) .benefit-item:nth-of-type(1) p': 'Arbitrum blockchain. Cost — 1–3 cents.',
        'main > section:nth-of-type(5) .benefit-item:nth-of-type(2) p': 'Chainlink — verification of sensor data.',
        'main > section:nth-of-type(5) .benefit-item:nth-of-type(3) p': 'Decree No. 8 legalizes smart contracts in Belarus.',
        'main > section:nth-of-type(5) .benefit-item:nth-of-type(4) p': 'Cryptographic signature — server cannot modify sensor data.',
        'main > section:nth-of-type(6) .eyebrow': 'Pricing for carriers',
        'main > section:nth-of-type(6) h2': 'Flexible subscription plans',
        'main > section:nth-of-type(6) th:nth-of-type(1)': 'Plan',
        'main > section:nth-of-type(6) th:nth-of-type(2)': 'Price',
        'main > section:nth-of-type(6) th:nth-of-type(3)': 'Features',
        'main > section:nth-of-type(6) tbody tr:nth-of-type(1) td:nth-of-type(1)': 'Basic',
        'main > section:nth-of-type(6) tbody tr:nth-of-type(1) td:nth-of-type(2)': '79 BYN / month',
        'main > section:nth-of-type(6) tbody tr:nth-of-type(1) td:nth-of-type(3)': 'Trip log, documents, confirmations',
        'main > section:nth-of-type(6) tbody tr:nth-of-type(2) td:nth-of-type(1)': 'Pro',
        'main > section:nth-of-type(6) tbody tr:nth-of-type(2) td:nth-of-type(2)': '149 BYN / month',
        'main > section:nth-of-type(6) tbody tr:nth-of-type(2) td:nth-of-type(3)': 'GPS and temperature sensors, timeline, secured act',
        'main > section:nth-of-type(6) tbody tr:nth-of-type(3) td:nth-of-type(1)': 'Enterprise',
        'main > section:nth-of-type(6) tbody tr:nth-of-type(3) td:nth-of-type(2)': '299 BYN / month',
        'main > section:nth-of-type(6) tbody tr:nth-of-type(3) td:nth-of-type(3)': 'API, White-Label, SLA, 24/7 support',
        'main > section:nth-of-type(6) .pricing-note': 'For owners — paid module "secure transportation", 5–12 BYN per trip. Sensor rental — 35–50 BYN per month per device.',
        'main > section:nth-of-type(7) .eyebrow': 'Financial forecast',
        'main > section:nth-of-type(7) h2': 'Project economics',
        'main > section:nth-of-type(7) .benefit-item:nth-of-type(1) p': 'MVP — 46–79 thousand BYN.',
        'main > section:nth-of-type(7) .benefit-item:nth-of-type(2) p': 'Year 1: 22 thousand BYN revenue.',
        'main > section:nth-of-type(7) .benefit-item:nth-of-type(3) p': 'Year 2: 55–70 thousand BYN revenue.',
        'main > section:nth-of-type(7) .benefit-item:nth-of-type(4) p': 'Year 3: 250+ thousand BYN revenue.',
        'main > section:nth-of-type(7) .benefit-item:nth-of-type(5) p': 'Payback period — 2 years.',
        'main > section:nth-of-type(7) .benefit-item:nth-of-type(6) p': 'ROI — 140–165%.',
        '.footer-copy .eyebrow': 'Contacts',
        '.footer-copy h2': 'Leave a request for a pilot launch',
        '.footer-copy p:nth-of-type(2)': 'Email:  dogchain.pet@gmail.com',
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
        ? `Email: <a href="${originalContacts.emailHref}"> ${originalContacts.emailText}</a>`
        : `Email: <a href="${originalContacts.emailHref}"> ${originalContacts.emailText}</a>`;
    }

    if (phoneLine) {
      phoneLine.innerHTML = isEnglish
        ? `Phone: <a href="${originalContacts.phoneHref}"> ${originalContacts.phoneText}</a>`
        : `Телефон: <a href="${originalContacts.phoneHref}"> ${originalContacts.phoneText}</a>`;
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
