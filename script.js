$(function () {
  var canvas = document.getElementById('nodes'),
    ctx = canvas.getContext('2d'),
    color = 'rgba(255, 255, 255, .5)'
  ;(width = window.innerWidth), (height = window.innerHeight)

  canvas.width = width
  canvas.height = height
  ctx.fillStyle = color

  var dots = {
    num: 100,
    distance: 200,
    d_radius: 200,
    velocity: -0.9,
    array: []
  }

  function Dot() {
    this.x = Math.random() * width
    this.y = Math.random() * height

    this.vx = dots.velocity + Math.random()
    this.vy = dots.velocity + Math.random()

    this.radius = Math.random() * 2
  }

  Dot.prototype = {
    create: function () {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      ctx.fill()
    },

    animate: function () {
      for (var i = 0; i < dots.num; i++) {
        var dot = dots.array[i]

        if (dot.x < 0 || dot.x > width) {
          dot.vx = -dot.vx
          dot.vy = dot.vy
        } else if (dot.y < 0 || dot.y > height) {
          dot.vx = dot.vx
          dot.vy = -dot.vy
        }
        dot.x += dot.vx
        dot.y += dot.vy
      }
    }
  }

  function createDots() {
    ctx.clearRect(0, 0, width, height)
    for (var i = 0; i < dots.num; i++) {
      dots.array.push(new Dot())
      dot = dots.array[i]
      dot.create()
    }
    dot.animate()
  }

  setInterval(createDots, 1000 / 30)

  $(document).on('resize', function () {
    canvas.width = width
    canvas.height = height
  })
})
