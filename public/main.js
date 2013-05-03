$(document).ready(function () {
   if (window['localStorage'] == null)
      return;
   
   $('a.toggle').click(function () {
      $this = $(this);
      $('.on').removeClass('on');
      $this.addClass('on');
   });

   $('a.going').click(function () {
      $('input:not(:checked)').parents('li').hide();
   });

   $('a.all').click(function () {
      $('li').not('.expired').show();
   });

   setInterval(function () {
      var now = new Date();

      $('li').each(function () {
         var $this = $(this);
         
         var date = new Date($this.data('time'));

         if (date.getTime() < (now.getTime() - 30 * 1000 * 60)) {
            $this.hide();
            
            if (!$this.hasClass('expired')) {
               $this.addClass('expired');   
            }
         }

      });
   }, 1000);

   var go = JSON.parse(localStorage["go"] || '[]');

   $('input[type=checkbox]').each(function () {
      var $this = $(this);
      var $parent = $this.parents('li').first();
      var session = $parent.data('session');

      if (go.indexOf(session) >= 0) {
         $this.attr('checked', true);
      }
   });

   $('input[type=checkbox]').click(function () {
      var $this = $(this);
      var $parent = $this.parents('li').first();
      var session = $parent.data('session');

      if ($this.is(':checked')) {
         go.push(session);
      }
      else {
         var index = go.indexOf(session);
         if (index >= 0) {
            go.splice(index, 1);  
         }
      }

      localStorage["go"] = JSON.stringify(go);
   });
});