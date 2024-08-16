document.addEventListener('DOMContentLoaded', function() {
    const loginScreen = document.getElementById('login-screen');
    const mainScreen = document.getElementById('main-screen');
    const voteSection = document.getElementById('vote-section');
    const candidatesSection = document.getElementById('candidates-section');
    const rulesSection = document.getElementById('rules-section');
    const confirmationScreen = document.getElementById('confirmation-screen');
    const loginForm = document.getElementById('login-form');
    const captchaText = document.getElementById('captcha-text');
    const captchaInput = document.getElementById('captcha');
    const governorateSelect = document.getElementById('governorate');
    const districtSelect = document.getElementById('district');
    const candidateSelect = document.getElementById('candidate');
    const backToMainButtons = document.querySelectorAll('#back-to-main');
    const backToMainFromConfirmation = document.getElementById('back-to-main-from-confirmation');
    const voteForm = document.getElementById('vote-form');
    const refreshCaptchaButton = document.getElementById('refresh-captcha');
    const confirmCheckbox = document.getElementById('confirm');
    const faceAuthButton = document.getElementById('face-auth');

    let currentCaptcha = generateCaptcha(); // Generate and display initial captcha
    let hasVoted = false; // Track voting status

    const districts = {
        'amman': ['اللواء 1', 'اللواء 2'],
        'zarqa': ['اللواء 3', 'اللواء 4'],
        'irbid': ['اللواء 5', 'اللواء 6'],
        'mafraq': ['اللواء 7', 'اللواء 8'],
        'karak': ['اللواء 9', 'اللواء 10'],
        'aqaba': ['اللواء 11', 'اللواء 12'],
        'madaba': ['اللواء 13', 'اللواء 14']
    };

    const candidates = {
        'اللواء 1': ['مرشح 1', 'مرشح 2'],
        'اللواء 2': ['مرشح 3'],
        'اللواء 3': ['مرشح 4'],
        'اللواء 4': ['مرشح 5'],
        'اللواء 5': ['مرشح 6'],
        'اللواء 6': ['مرشح 7'],
        'اللواء 7': ['مرشح 8'],
        'اللواء 8': ['مرشح 9'],
        'اللواء 9': ['مرشح 10'],
        'اللواء 10': ['مرشح 11'],
        'اللواء 11': ['مرشح 12'],
        'اللواء 12': ['مرشح 13'],
        'اللواء 13': ['مرشح 14'],
        'اللواء 14': ['مرشح 15']
    };

    function showSection(section) {
        [voteSection, candidatesSection, rulesSection, confirmationScreen].forEach(s => s.classList.add('hidden'));
        section.classList.remove('hidden');
    }

    function showMainContent() {
        loginScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
    }

    function generateCaptcha() {
        const captcha = Math.floor(Math.random() * 9000) + 1000;
        captchaText.textContent = captcha;
        return captcha;
    }

    function confirmFaceAuth(successCallback) {
        // محاكاة لعملية التحقق ببصمة الوجه
        alert('جارٍ التحقق من بصمة الوجه...');

        // هنا يمكنك وضع شروط التحقق الوهمية
        setTimeout(function() {
            const success = Math.random() > 0.2; // 80% chance of success
            if (success) {
                alert('تم التحقق من بصمة الوجه بنجاح.');
                successCallback(); // Call the success callback
            } else {
                alert('فشل التحقق من بصمة الوجه. يرجى المحاولة مرة أخرى.');
            }
        }, 2000); // 2 ثانية لمحاكاة التحقق
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nationalId = document.getElementById('national-id').value;
        const password = document.getElementById('password').value;
        const captcha = captchaInput.value;

        if (nationalId === '2024' && password === '0000' && captcha === currentCaptcha.toString()) {
            showMainContent();
        } else {
            alert('الرقم الوطني أو كلمة السر أو التحقق غير صحيح');
            currentCaptcha = generateCaptcha(); // Regenerate captcha on failure
        }
    });

    refreshCaptchaButton.addEventListener('click', function() {
        currentCaptcha = generateCaptcha(); // Regenerate captcha on button click
    });

    document.getElementById('vote-tab').addEventListener('click', function(event) {
        event.preventDefault();
        showSection(voteSection);
    });

    document.getElementById('candidates-tab').addEventListener('click', function(event) {
        event.preventDefault();
        showSection(candidatesSection);
    });

    document.getElementById('rules-tab').addEventListener('click', function(event) {
        event.preventDefault();
        showSection(rulesSection);
    });

    governorateSelect.addEventListener('change', function() {
        const selectedGovernorate = governorateSelect.value;
        districtSelect.innerHTML = '<option value="">اختر لواء</option>';
        candidateSelect.innerHTML = '<option value="">اختر مرشح</option>';

        if (selectedGovernorate) {
            districts[selectedGovernorate].forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        }
    });

    districtSelect.addEventListener('change', function() {
        const selectedDistrict = districtSelect.value;
        candidateSelect.innerHTML = '<option value="">اختر مرشح</option>';

        if (selectedDistrict) {
            candidates[selectedDistrict].forEach(candidate => {
                const option = document.createElement('option');
                option.value = candidate;
                option.textContent = candidate;
                candidateSelect.appendChild(option);
            });
        }
    });

    voteForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (hasVoted) {
            alert('لقد قمت بالتصويت بالفعل ولا يمكنك التصويت مرة أخرى.');
            return;
        }

        if (!confirmCheckbox.checked) {
            alert('يرجى تأكيد صحة المعلومات.');
            return;
        }

        confirmFaceAuth(function() {
            hasVoted = true;
            showSection(confirmationScreen);
        });
    });

    faceAuthButton.addEventListener('click', function() {
        confirmFaceAuth(function() {
            // No action needed here, just ensuring the callback is used
        });
    });

    backToMainButtons.forEach(button => {
        button.addEventListener('click', function() {
            showMainContent();
        });
    });

    backToMainFromConfirmation.addEventListener('click', function() {
        showMainContent();
    });
});
