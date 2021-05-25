function menuHamburger() {
	const buttonOpen = document.querySelector(".hamburger");
	const buttonClose = document.querySelector(".menu__close");
	const menu = document.querySelector(".menu");

	function closeMenu(element, className) {
		element.classList.remove(className)
	}
	function openMenu(element, className) {
		element.classList.add(className)
	}

	buttonOpen.addEventListener("click", function (event) {
		event.preventDefault();
		openMenu(menu, "menu-opened")
	})
	buttonClose.addEventListener("click", function (event) {
		event.preventDefault();
		openMenu(menu, "menu-opened")
	})

	menu.addEventListener("click", function (event) {
		const target = event.target;
		console.log(target);
		if (target.classList.contains("menu__link")) {
			closeMenu(menu, "menu-opened");
		}
	})

}
menuHamburger();


const openItem = (item) => {

	const container = item.closest(".team__item");
	const contentBlock = container.find(".team__content");
	const textBlock = contentBlock.find(".team__content-block");
    const reqHeight = textBlock.height();

	container.addClass('active');
	contentBlock.height(reqHeight);
}

const closeEveryItem = (container) => {
	const items = container.find(".team__content");
	const itemContainer = container.find(".team__item");

	itemContainer.removeClass('active');

	items.height(0);
};

$(".team__title").click((e) => {
	const $this = $(e.currentTarget);
	const container = $this.closest(".team");
	const elemContainer = $this.closest(".team__item");

	if (elemContainer.hasClass("active")) {
		closeEveryItem(container);
		
	} else {
		closeEveryItem(container);
		openItem($this);
	}


	
});


const slider = $('.products').bxSlider({
	pager: false,
	controls:false,
});

$('.products-slider__arrows--direction--prev').click((e) => {
	e.preventDefault();
	slider.goToPrevSlide();
});

$('.products-slider__arrows--direction--next').click((e) => {
	e.preventDefault();
	slider.goToNextSlide();
});



const validateFilds = (form, fieldsArray) => {
	fieldsArray	.forEach((field) => {
		field.removeClass("input-error");
		if (field.val().trim() === "") {
			field.addClass("input-error");
		}
	});

	const errorFields = form.find(".input-error");

	return errorFields.length === 0;
}

$(".form").submit((e) => {
	e.preventDefault();

	const form = $(e.currentTarget);
	const name = form.find("[name='name']");
	const phone = form.find("[name='phone']");
	const comment = form.find("[name='comment']");
	const to = form.find("[name='to']");

	const modal = $("#modal");
	const content = modal.find(".modal__content");

	modal.removeClass("error-modal");
	 
	const isValid = validateFilds(form, [name, phone, comment, to]);

	

	if (isValid) {
		 const request = $.ajax({
			url: "https://webdev-api.loftschool.com/sendmail",
			method: 'post',
			data: {
				name: name.val(),
				phone: phone.val(),
				comment: comment.val(),
				to: to.val(),
			},
			
			 error: data => { },
				
		 });
		
		request.done(data => {
			content.text(data.message);
			
		});

		request.fail((data) => {
			const message = data.responseJSON.message;
			content.text(message);
			modal.addClass("error-modal");
		});
		
		request.always(() => {
			$.fancybox.open({
				src: '#modal',
				type: 'inline',
			});
		})
	}
});

    $('.app-close-modal').click((e) => {
		e.preventDefault();

		$.fancybox.close();
	})
