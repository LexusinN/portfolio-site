// ==========================================
// Интерактивный элемент 1: Мобильное меню
// ==========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
  });

  // Закрытие меню при клике на ссылку
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('mobile-open');
    });
  });
}

// ==========================================
// Интерактивный элемент 2: Анимация навыков
// ==========================================
const skillCards = document.querySelectorAll('.skill-card');

const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -50px 0px',
};

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const level = parseInt(card.getAttribute('data-level'), 10);
      const bar = card.querySelector('.skill-bar');
      if (bar) {
        bar.style.width = `${level}%`;
        card.classList.add('active');
      }
    }
  });
}, observerOptions);

skillCards.forEach((card) => {
  skillsObserver.observe(card);
});

// ==========================================
// Интерактивный элемент 3: Валидация формы
// ==========================================
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const charCount = document.getElementById('charCount');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  // Счётчик символов
  if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
      const current = messageInput.value.length;
      charCount.textContent = `${current} / 500`;

      if (current > 450) {
        charCount.style.color = '#ef4444';
      } else {
        charCount.style.color = '';
      }
    });
  }

  // Валидация поля имени
  if (nameInput) {
    nameInput.addEventListener('blur', () => {
      validateField(nameInput, 'nameError', (value) => value.trim().length >= 2);
    });
  }

  // Валидация email
  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      validateField(
        emailInput,
        'emailError',
        (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      );
    });
  }

  // Валидация сообщения
  if (messageInput) {
    messageInput.addEventListener('blur', () => {
      validateField(messageInput, 'messageError', (value) => value.trim().length >= 10);
    });
  }

  // Отправка формы
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameValid = validateField(nameInput, 'nameError', (v) => v.trim().length >= 2);
    const emailValid = validateField(
      emailInput,
      'emailError',
      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    );
    const messageValid = validateField(messageInput, 'messageError', (v) => v.trim().length >= 10);

    if (!nameValid || !emailValid || !messageValid) {
      if (formStatus) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Пожалуйста, исправьте ошибки в форме.';
      }
      return;
    }

    // Имитация отправки
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (formStatus) {
      formStatus.className = 'form-status success';
      formStatus.textContent = '✅ Сообщение успешно отправлено!';
    }

    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Отправить';

    // Убрать статус через 5 секунд
    setTimeout(() => {
      if (formStatus) formStatus.textContent = '';
    }, 5000);
  });
}

// ==========================================
// Утилита: валидация поля
// ==========================================
function validateField(input, errorId, validator) {
  const error = document.getElementById(errorId);
  const value = input.value;

  if (validator(value)) {
    input.classList.remove('error');
    input.classList.add('success');
    if (error) error.style.display = 'none';
    return true;
  } else {
    input.classList.remove('success');
    input.classList.add('error');
    if (error) error.style.display = 'block';
    return false;
  }
}

// ==========================================
// Кнопка "Наверх"
// ==========================================
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
