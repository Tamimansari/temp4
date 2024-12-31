const width = 960;
const height = 600;

const svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height);

const nodes = [
    { id: "A", label: "Commit A" },
    { id: "B", label: "Commit B" },
    { id: "C", label: "Commit C" }
];

const links = [

    { source: "A", target: "B" },
    
    { source: "B", target: "C" }

];

const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("class", "link");

const node = svg.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 5)
    .attr("fill", "steelblue")
    .call(drag(simulation));

node.append("title")
    .text(d => d.id);

simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
});

function drag(simulation) {
    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}
