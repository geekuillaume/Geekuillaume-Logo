window.onload = function() {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    var el = document.getElementById("plexus");

    // Coordinates of all points
    var points = [{"x":138,"y":34},{"x":114,"y":48},{"x":97,"y":72},{"x":90,"y":100},{"x":89,"y":121},{"x":92,"y":149},{"x":101,"y":176},{"x":120,"y":197},{"x":145,"y":208},{"x":174,"y":210},{"x":201,"y":208},{"x":228,"y":194},{"x":245,"y":172},{"x":254,"y":145},{"x":256,"y":117},{"x":252,"y":90},{"x":241,"y":64},{"x":220,"y":44},{"x":194,"y":33},{"x":167,"y":30},{"x":69,"y":211},{"x":48,"y":192},{"x":33,"y":167},{"x":25,"y":141},{"x":24,"y":111},{"x":29,"y":85},{"x":40,"y":57},{"x":58,"y":37},{"x":81,"y":21},{"x":107,"y":10},{"x":134,"y":4},{"x":162,"y":0},{"x":190,"y":1},{"x":218,"y":6},{"x":245,"y":16},{"x":270,"y":28},{"x":291,"y":32},{"x":313,"y":13},{"x":338,"y":2},{"x":365,"y":0},{"x":392,"y":8},{"x":412,"y":28},{"x":420,"y":54},{"x":416,"y":81},{"x":397,"y":100},{"x":369,"y":101},{"x":349,"y":83},{"x":353,"y":56},{"x":375,"y":43},{"x":362,"y":32},{"x":335,"y":36},{"x":311,"y":49},{"x":308,"y":72},{"x":317,"y":98},{"x":321,"y":125},{"x":318,"y":153},{"x":305,"y":181},{"x":287,"y":202},{"x":265,"y":219},{"x":240,"y":230},{"x":212,"y":239},{"x":185,"y":242},{"x":156,"y":242},{"x":133,"y":239},{"x":102,"y":230},{"x":146,"y":342},{"x":104,"y":346},{"x":77,"y":354},{"x":56,"y":372},{"x":52,"y":398},{"x":66,"y":423},{"x":92,"y":434},{"x":118,"y":438},{"x":146,"y":442},{"x":176,"y":441},{"x":204,"y":442},{"x":233,"y":439},{"x":261,"y":432},{"x":286,"y":422},{"x":303,"y":402},{"x":303,"y":375},{"x":287,"y":353},{"x":259,"y":345},{"x":232,"y":344},{"x":202,"y":342},{"x":174,"y":342},{"x":51,"y":221},{"x":29,"y":237},{"x":16,"y":262},{"x":13,"y":289},{"x":27,"y":313},{"x":49,"y":329},{"x":17,"y":355},{"x":2,"y":378},{"x":0,"y":406},{"x":12,"y":433},{"x":32,"y":450},{"x":58,"y":461},{"x":85,"y":469},{"x":114,"y":474},{"x":141,"y":475},{"x":170,"y":476},{"x":199,"y":475},{"x":228,"y":473},{"x":254,"y":469},{"x":282,"y":462},{"x":306,"y":452},{"x":331,"y":437},{"x":348,"y":414},{"x":356,"y":388},{"x":354,"y":358},{"x":344,"y":334},{"x":324,"y":313},{"x":298,"y":302},{"x":271,"y":296},{"x":243,"y":293},{"x":214,"y":293},{"x":185,"y":292},{"x":157,"y":292},{"x":130,"y":291},{"x":103,"y":292},{"x":75,"y":285},{"x":64,"y":262},{"x":76,"y":239}];
    // Maximum distance after which we don't trace lines between points
    var maxDistance = 110;

    // Basic function to get distance between two points
    var getDistance = function(point1, point2) {
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    }

    // Get all points and trace lines between them
    var refreshPoints = function() {
        // Array referencing every lines for animation
        var lines = []
        // Loop over every point
        for (var i = points.length - 1; i >= 0; i--) {
            // Loop over every point needed to be linked
            for (var j = 0, _length = points.length; j < _length; j++) {
                // Get distance and verify if needed to be linked
                var distance = getDistance(points[j], points[i]);
                if (distance == 0 || distance > maxDistance)
                    continue;
                // Create the line between the two points
                var line = document.createElementNS('http://www.w3.org/2000/svg', "line")
                line.setAttribute('x1', points[i].x);
                line.setAttribute('y1', points[i].y);
                line.setAttribute('x2', points[j].x);
                line.setAttribute('y2', points[j].y);
                line.setAttribute("class", "plexus-line")
                // Init stroke properties, first the stroke is not visible
                line.style.strokeDasharray = distance + " " + distance;
                line.style.strokeDashoffset = distance;
                line.style.transitionDelay = line.style.WebkitTransitionDelay = ((i * 50 % 1500) / 1000) + "s"
                // Add the line to the SVG element
                el.appendChild(line);
                lines.push(line);
            };
        };
        // Using requestAnimationFrame to wait for page visibility before starting animation
        window.requestAnimationFrame(function() {
            // Set Dashoffset to 0 to start the animation
            for (var i = lines.length - 1; i >= 0; i--) {
                lines[i].style.strokeDashoffset = 0
            };
        })
    }

    // Start tracing lines
    refreshPoints()
}
