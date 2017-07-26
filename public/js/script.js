$(function () {
  /* ----------------------------------------- */
  const apiAllHeroesUrl = `https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=${STEAM_API_KEY}`
  const apiAllItemsUrl = `https://api.steampowered.com/IEconDOTA2_570/GetGameItems/V001/?key=${STEAM_API_KEY}`
  const crossOriginUrl = `https://crossorigin.me/`
  const heroImgUrl = 'http://cdn.dota2.com/apps/dota2/images/heroes/'
  // HERONAME_SUFFIX`
  const itemImgUrl = 'http://cdn.dota2.com/apps/dota2/images/items/'
  // ITEMNAME_SUFFIX`
  /* ----------------------------------------- */
  $allHeroesList = $('.allHeroesList')
  $heroDropdown = $('.heroDropdown')
  $allItemsList = $('.allItemsList')
  $buildsByHero = $('.buildsByHero')
  $deleteBuild = $('.deleteBuild')
  /* ----------------------------------------- */
  function capitalize (str) {
    var split = str.split('_')
    var caps = split.map(function (e) {
      return (e.charAt(0).toUpperCase() + e.substring(1))
    })
    return caps.join(' ')
  }
  /* ----------------------------------------- */

  $.get(`${crossOriginUrl}${apiAllHeroesUrl}`).done(function (data) {
    var allHeroes = data.result.heroes
    // console.log(allHeroes)
    var sortedHeroes = allHeroes.sort(function (a, b) {
      return (a.id - b.id)
    })
    sortedHeroes.forEach(function (indiv) {
      var heroName = indiv.name.substring(14)
      var formattedHeroName = capitalize(heroName)

      $newOption = $('<option>')
      $newOption.text(formattedHeroName)
      $heroDropdown.append($newOption)
      // $newName = $('<li>')
      // $newName.text(heroName)
      $newImg = $('<img class="heroImg">')
      $newImg.attr('src', `http://cdn.dota2.com/apps/dota2/images/heroes/${heroName}_lg.png`)
      $newImg.attr('alt', `${heroName}`)
      // $('.allHeroesList').append($newName)
      $allHeroesList.append($newImg)
    })
  })
  /* ----------------------------------------- */
  $allHeroesList.on('click', 'img', function (e) {
    console.log(e.currentTarget.alt)
    $buildsByHero.html('')
    // var formattedHeroName = capitalize(e.currentTarget.alt)
    // $('.heroName').text(`Builds for ${formattedHeroName}`)

    $.get(`/builds/${e.currentTarget.alt}`).done(function (allData) {
      if (!allData.length) {
        $('.redirectCreate').text('No builds found. Be the first to create one?')
      } else {
        $('.redirectCreate').text('Don\'t like what you see? Create your own build!')
      }

      allData.forEach(function (indiv) {
        $newCard = $(`<div class="column is-3 card">`)
        $newCardContent = $('<div class="card-content">')
        $newCard.append($newCardContent)
        $buildsByHero.append($newCard)

        $newHeroName = $('<h1>')
        $newHeroName.text(`Build title: ${indiv.title}`)
        $newCardContent.append($newHeroName)

        $newCreatorName = $('<h1>')
        $newCreatorName.text(`Creator of this build: ${indiv.creator.name}`)
        $newCardContent.append($newCreatorName)

        $startingSection = $('<h1>')
        $startingSection.text('Starting Off')
        $newCardContent.append($startingSection)

        indiv.starting.forEach(function (each) {
          $newImg = $('<img class="itemImg">')
          $newImg.attr('src', `http://cdn.dota2.com/apps/dota2/images/items/${each}_lg.png`)
          $newCardContent.append($newImg)
        })

        $coreSection = $('<h1>')
        $coreSection.text('Core Items')
        $newCardContent.append($coreSection)

        indiv.core.forEach(function (each) {
          $newImg = $('<img class="itemImg">')
          $newImg.attr('src', `http://cdn.dota2.com/apps/dota2/images/items/${each}_lg.png`)
          $newCardContent.append($newImg)
        })

        $lateSection = $('<h1>')
        $lateSection.text('Late Game')
        $newCardContent.append($lateSection)

        indiv.late.forEach(function (each) {
          $newImg = $('<img class="itemImg">')
          $newImg.attr('src', `http://cdn.dota2.com/apps/dota2/images/items/${each}_lg.png`)
          $newCardContent.append($newImg)
        })
      })
    })
  })
  /* ----------------------------------------- */
  // calling api for items for create page
  $.get(`${crossOriginUrl}${apiAllItemsUrl}`).done(function (data) {
    var allItems = data.result.items
    // console.log(allItems)
    var filteredItems = allItems.filter(function (e) {
      return (e.name.indexOf('recipe') === -1 && e.name.indexOf('river') === -1 && e.name.indexOf('dagon_') === -1 && e.name.indexOf('tango_') === -1 && e.name.indexOf('aegis') === -1 && e.name.indexOf('cheese') === -1 && e.name.indexOf('necronomicon_') === -1 && e.name.indexOf('ward_dispenser') === -1)
    })
    var sortedItems = filteredItems.sort(function (a, b) {
      return a.cost - b.cost
    })
    sortedItems.forEach(function (indiv) {
      var itemName = indiv.name.substring(5)
      // console.log(itemName, indiv.cost)
      $newImg = $('<img class="itemImg">')
      $newImg.attr('src', `http://cdn.dota2.com/apps/dota2/images/items/${itemName}_lg.png`)
      $newImg.attr('alt', `${itemName}`)
      $allItemsList.append($newImg)
    })
  }) // close .get

  /* ----------------------------------------- */
  $allItemsList.on('click', 'img', function (e) {
    var $clicked = $(this).clone(true)
    $('.active').append($clicked)
    // console.log($('.active').attr('id'))
    var sectionId = $('.active').attr('id')
    $newInput = $('<input type="hidden" value="">')
    $newInput.attr('name', `build[${sectionId}]`)
    $newInput.attr('value', e.target.alt)
    $newInput.addClass(e.target.alt)
    $('.active').append($newInput)
  })

  $('.buildSection').on('click', function () {
    $('.card-content').removeClass('active')
    $(this).addClass('active')
  })

  $('.buildSection').on('click', 'img', function () {
    // console.log($(this).parent())
    if ($(this).parent().hasClass('active')) {
      // console.log($(this)[0].alt)
      var hiddenInputClass = '.' + $(this)[0].alt
      // console.log('input class is ', hiddenInputClass)
      $(this).siblings(hiddenInputClass)[0].remove() // remove only 1 instance
      $(this).remove()
    }
  })

/* ----------------------------------------- */
  $deleteBuild.on('click', function(e) {
    if (confirm('Are you sure? Deleted builds cannot be recovered.')) {
      // console.log('going to delete')
      $.post(`/builds/manage/${e.currentTarget.id}`).done(function(data) {
        location.reload()
      })
    }
    // console.log(e.currentTarget.id)

  })

}) // close fn on ready
