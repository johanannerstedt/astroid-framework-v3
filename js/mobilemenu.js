(function ($) {
   $.fn.astroidMobileMenu = function () {
      this.each(function () {
         var _this = $(this);
         _this.find('li').addClass('menu-item');
         _this.find('li').each(function () {
            $(this).children('ul').addClass('dropdown-menus');
            $(this).children('ul').find('li').addClass('dropdown-menus-item');
         });

         var _mobileCheck = function () {
            var check = false;
            (function (a) {
               if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                  check = true
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
         };

         var _eventtype = _mobileCheck() ? 'touchstart' : 'click';
         var _trigger = $(this);
         var _content = $(_trigger.data('mobilemenu'));
         var _class = _content.data('class-prefix');
         if (_class == '' || typeof _class == 'undefined' || _class == 'undefined' || _class == null) {
            _class = 'astroid-mobilemenu';
         }

         _this.wrap('<div class="astroid-mobilemenu-container" />').wrap('<div class="astroid-mobilemenu-inner"></div>');

         // Add Class For Sub Menu
         _this.find('li:has(> ul)').addClass('subMenu-wrapper');

         _this.find('li').each(function () {
            // Get Text For Sub Menu Back Button
			if ($(this).children('a').length) {
				var sub_menu_lable = $(this).children('a').html();
			}else{
				var sub_menu_lable = $(this).children('span').html();
			}
            if ($(this).hasClass('subMenu-wrapper')) {
               var _indicator = $('<span class="menu-indicator"><i class="fas fa-angle-right"></i></span>');
               var _indicatorBackItem = $('<li class="menu-item menu-go-back"></li>');
               var _indicatorBack = $('<span class="menu-indicator-back"><i class="fas fa-angle-left"></i></span>');
               _indicatorBack.append(sub_menu_lable);
               _indicatorBackItem.append(_indicatorBack);

               // Add Button For Toggle Sub Menu
               if ($(this).children('a').length) {
                  $(this).children('a').after(_indicator);
                  if ($(this).children('a').hasClass('item-link-heading')) {
                     $(this).children('a').bind('click', function (event) {
                        event.preventDefault();
                        _indicator.next('.dropdown-menus').toggleClass('menu_open');
                     });
                  }
               }else{
                  $(this).children('span').after(_indicator);
               }
               // For Sub menu Open
               _indicator.bind(_eventtype, function () {
                  $(this).next('.dropdown-menus').toggleClass('menu_open');
               });
               // Add Button In Sub Menu For Main Menu
               $(this).children('ul').prepend(_indicatorBackItem);
               // For sub Menu Close
               _indicatorBack.bind(_eventtype, function () {
                  $(this).parent().parent('.dropdown-menus').removeClass('menu_open');
               });
            }
         });
      });
      return this;
   };
}(jQuery));