import * as d3 from 'd3'

export default _ => {

  console.log('bubbling', d3)

  const data = {
    name: "layout",
    children: [
        { name: "AxisLayout", size: 6725 },
        { name: "BundledEdgeRouter", size: 3727 },
        { name: "CircleLayout", size: 9317 },
        { name: "CirclePackingLayout", "size": 12003 },
        { name: "DendrogramLayout", "size": 4853 },
        { name: "ForceDirectedLayout", "size": 8411 },
        { name: "IcicleTreeLayout", "size": 4864 },
        { name: "IndentedTreeLayout", "size": 3174 },
        { name: "Layout", "size": 7881 },
        { name: "NodeLinkTreeLayout", "size": 12870 },
        { name: "PieLayout", "size": 2728 },
        { name: "RadialTreeLayout", "size": 12348 },
        { name: "RandomLayout", "size": 870 },
        { name: "StackedAreaLayout", "size": 9121 },
        { name: "TreeMapLayout", "size": 9191 }
    ]
  }
  
  const margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  const width = 400 - margin.left - margin.right
      , height = 400 - margin.top - margin.bottom
  
  console.log('hur',
    // d3.scaleOrdinal().domain(d3.range(1)).rangePoints
    d3.scalePoint()
      .domain(d3.range(1))
      .range([0, width], 1)
  )

  const n = data.children.length
      , m = 1
      , padding = 6
      , radius = d3.scaleSqrt().range([0, 12])
      , color = d3.scaleOrdinal(d3.schemeCategory10).domain(d3.range(m))
      , x = d3.scaleOrdinal().domain(d3.range(m)).rangePoints([0, width], 1)
  
  const nodes = d3.range(n).map(function () {
    const i = Math.floor(Math.random() * m), //color
        v = (i + 1) / m * -Math.log(Math.random()); //value
    return {
      radius: radius(v),
      color: color(i),
      cx: x(i),
      cy: height / 2,
    };
  
  });
  
  nodes.forEach(function (item, index) {
      item.radius = data.children[index].size/300;
  });
  
  const force = d3.layout.force()
      .nodes(nodes)
      .size([width, height])
      .gravity(0)
      .charge(0)
      .on("tick", tick)
      .start();
  
  const drag = force.drag()
      .on("drag", dragmove);
  
  const tooltip = d3.select("body").append("div")   
      .attr("class", "tooltip")               
      .style("opacity", 0);
  
  function dragmove(d) {
      const euclideanDistance = Math.sqrt(Math.pow((d.px - 198), 2) + Math.pow((d.py - 198), 2));
      
      if(euclideanDistance > 198 - d.radius){
          d.px = d.px - 198;
          d.py = d.py - 198;
          
          const radians = Math.atan2(d.py, d.px);
          
          d.px = Math.cos(radians) * (198 - d.radius) + 198;
          d.py = Math.sin(radians) * (198 - d.radius) + 198;
      }
  }
  
  const svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  const circle = svg.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", function (d) {
        return d.radius;
      })
      .style("fill", function (d, i) {
        return "green";
      })
      .call(drag);
  
  circle.on("mouseover", function(d,i) {
          tooltip.transition().duration(200).style("opacity", .9);      
          tooltip.html(data.children[i].name)  
          .style("left", (d3.event.pageX) + "px")     
          .style("top", (d3.event.pageY - 28) + "px");    
      })                  
      .on("mouseout", function(d) {       
          tooltip.transition().duration(500).style("opacity", 0);   
      });
  
  function tick(e) {
    circle.each(gravity(.2 * e.alpha))
        .each(collide(.5))
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        });
  }
  
  // Move nodes toward cluster focus.
  function gravity(alpha) {
    return function (d) {
      d.y += (d.cy - d.y) * alpha;
      d.x += (d.cx - d.x) * alpha;
    };
  }
  
  // Resolve collisions between nodes.
  function collide(alpha) {
    const quadtree = d3.geom.quadtree(nodes);
    return function (d) {
      const r = d.radius + radius.domain()[1] + padding,
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
      quadtree.visit(function (quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== d)) {
          let x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
          if (l < r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }

}
