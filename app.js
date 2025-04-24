document.addEventListener('DOMContentLoaded', function () {

    // Declare cy variable here to make it accessible to the event listener
    let cy;

    // --- Cytoscape Graph ---
    const graphElements = [ // Store elements separately for potential reuse if needed
        // Nodes - Group A (Top Left)
        { data: { id: 'A1', label: '1', parent: 'groupA_tl' } },
        { data: { id: 'A5', label: '5', parent: 'groupA_tl' } },
        { data: { id: 'A3', label: '3', parent: 'groupA_tl' } },
        { data: { id: 'A6', label: '6', parent: 'groupA_tl' } },
        { data: { id: 'groupA_tl', label: '경로당 #1' } },
        // Nodes - Group A (Top Right)
        { data: { id: 'B1', label: '1', parent: 'groupA_tr' } },
        { data: { id: 'B3', label: '3', parent: 'groupA_tr' } },
        { data: { id: 'B9', label: '9', parent: 'groupA_tr' } },
        { data: { id: 'B4', label: '4', parent: 'groupA_tr' } },
        { data: { id: 'B6a', label: '6', parent: 'groupA_tr' } }, // Need unique IDs
        { data: { id: 'B6b', label: '6', parent: 'groupA_tr' } }, // Need unique IDs
        { data: { id: 'groupA_tr', label: '경로당 #2' } },
         // Nodes - Group A (Middle)
        { data: { id: 'C3', label: '3', parent: 'groupA_m' } },
        { data: { id: 'C2', label: '2', parent: 'groupA_m' } },
        { data: { id: 'C7', label: '7', parent: 'groupA_m' } },
        { data: { id: 'C1', label: '1', parent: 'groupA_m' } },
        { data: { id: 'C6', label: '6', parent: 'groupA_m' } },
        { data: { id: 'groupA_m', label: '경로당 #3' } },
        // Nodes - Group C (Left)
        { data: { id: 'D1', label: '1', parent: 'groupC_l' } },
        { data: { id: 'D5a', label: '5', parent: 'groupC_l' } }, // Unique ID
        { data: { id: 'D6', label: '6', parent: 'groupC_l' } },
        { data: { id: 'groupC_l', label: '경로당 #4' } },
         // Nodes - Group C (Right)
        { data: { id: 'E1', label: '1', parent: 'groupC_r' } },
        { data: { id: 'E4', label: '4', parent: 'groupC_r' } },
        { data: { id: 'E9', label: '9', parent: 'groupC_r' } },
        { data: { id: 'E3', label: '3', parent: 'groupC_r' } },
        { data: { id: 'E6a', label: '6', parent: 'groupC_r' } }, // Unique ID
        { data: { id: 'E6b', label: '6', parent: 'groupC_r' } }, // Unique ID
        { data: { id: 'groupC_r', label: '경로당 #5' } },
        // Nodes - Group C (Bottom)
        { data: { id: 'F2', label: '2', parent: 'groupC_b' } },
        { data: { id: 'F6a', label: '6', parent: 'groupC_b' } }, // Unique ID
        { data: { id: 'F5', label: '5', parent: 'groupC_b' } },
        { data: { id: 'F3', label: '3', parent: 'groupC_b' } },
        { data: { id: 'F6b', label: '6', parent: 'groupC_b' } }, // Unique ID
        { data: { id: 'groupC_b', label: '경로당 #6' } },

        // Edges - Group A (Top Left)
        { data: { source: 'A1', target: 'A3' } },
        { data: { source: 'A3', target: 'A5' } },
        { data: { source: 'A3', target: 'A6' } },
        // Edges - Group A (Top Right)
        { data: { source: 'B1', target: 'B3' } },
        { data: { source: 'B3', target: 'B9' } },
        { data: { source: 'B4', target: 'B3' } },
        { data: { source: 'B3', target: 'B6a' } },
        { data: { source: 'B3', target: 'B6b' } }, // Assuming connect to 3
        // Edges - Group A (Middle)
        { data: { source: 'C3', target: 'C2' } },
        { data: { source: 'C2', target: 'C7' } },
        { data: { source: 'C1', target: 'C2' } },
        { data: { source: 'C1', target: 'C6' } },
         // Edges - Group C (Left)
        { data: { source: 'D1', target: 'D5a' } },
        { data: { source: 'D5a', target: 'D6' } },
         // Edges - Group C (Right)
        { data: { source: 'E1', target: 'E4' } },
        { data: { source: 'E4', target: 'E9' } },
        { data: { source: 'E4', target: 'E3' } },
        { data: { source: 'E3', target: 'E6a' } },
         { data: { source: 'E3', target: 'E6b' } }, // Assuming connect to 3
         // Edges - Group C (Bottom)
        { data: { source: 'F2', target: 'F3' } },
        { data: { source: 'F3', target: 'F6a' } },
        { data: { source: 'F6a', target: 'F5' } },
         { data: { source: 'F3', target: 'F6b' } }, // Assuming connect to 3


        // Inter-group Edges (Approximation based on lines) - Added unique IDs
        { data: { source: 'groupA_tl', target: 'groupA_tr', id: 'e_atl_atr' } },
        { data: { source: 'groupA_tl', target: 'groupA_m', id: 'e_atl_am' } },
        { data: { source: 'groupA_tl', target: 'groupC_l', id: 'e_atl_cl' } },
        { data: { source: 'groupA_tr', target: 'groupA_m', id: 'e_atr_am' } },
        { data: { source: 'groupA_tr', target: 'groupC_r', id: 'e_atr_cr' } },
        { data: { source: 'groupA_m', target: 'groupC_b', id: 'e_am_cb' } },
        { data: { source: 'groupC_l', target: 'groupC_b', id: 'e_cl_cb' } },
        { data: { source: 'groupC_r', target: 'groupC_b', id: 'e_cr_cb' } },
    ];

    // Define positions for the 'preset' layout (keep this)
    const presetPositions = {
        // Row 1
        groupA_tl: { x: 100, y: 100 }, groupA_tr: { x: 450, y: 100 },
        A1: { x: 70, y: 85 }, A3: { x: 100, y: 100 }, A5: { x: 130, y: 85 }, A6: { x: 130, y: 115 },
        B1: { x: 410, y: 85 }, B3: { x: 450, y: 100 }, B9: { x: 490, y: 85 }, B4: { x: 410, y: 115 }, B6a: { x: 490, y: 105 }, B6b: { x: 490, y: 125 },
        // Row 2
        groupC_l: { x: 100, y: 280 }, groupA_m: { x: 275, y: 200 }, groupC_r: { x: 450, y: 280 },
        D1: { x: 80, y: 265 }, D5a: { x: 120, y: 265 }, D6: { x: 100, y: 295 },
        C3: { x: 245, y: 185 }, C2: { x: 275, y: 185 }, C7: { x: 305, y: 185 }, C1: { x: 255, y: 215 }, C6: { x: 285, y: 215 },
        E1: { x: 410, y: 265 }, E4: { x: 450, y: 265 }, E9: { x: 490, y: 265 }, E3: { x: 450, y: 295 }, E6a: { x: 480, y: 295 }, E6b: { x: 420, y: 295 },
        // Row 3
        groupC_b: { x: 275, y: 350 },
        F2: { x: 240, y: 335 }, F3: { x: 275, y: 350 }, F6a: { x: 310, y: 335 }, F5: { x: 310, y: 365 }, F6b: { x: 240, y: 365 },
    };


    // Initialize Cytoscape
    try {
        cy = cytoscape({ // Assign to the previously declared 'cy'
            container: document.getElementById('cy'),
            elements: graphElements, // Use the elements array
            style: [
                 {
                    selector: 'node[label]', style: { 'background-color': '#3b82f6', 'label': 'data(label)', 'color': '#ffffff', 'text-valign': 'center', 'text-halign': 'center', 'font-size': '10px', 'width': '20px', 'height': '20px' }
                },
                 {
                    selector: ':parent', style: { 'background-opacity': 0.333, 'background-color': '#374151', 'border-color': '#4b5563', 'border-width': 1, 'label': 'data(label)', 'color': '#d1d5db', 'text-valign': 'top', 'text-halign': 'center', 'font-size': '12px', 'font-weight': 'bold', 'padding': '15px' }
                },
                {
                    selector: 'edge', style: { 'width': 1, 'line-color': '#4b5563', 'target-arrow-color': '#4b5563', 'target-arrow-shape': 'none', 'curve-style': 'bezier' }
                },
                 { // Style for inter-group edges specifically
                    selector: 'edge[id *= "e_"]', style: { 'line-color': '#6b7280', 'width': 1.5, 'target-arrow-shape': 'none', 'curve-style': 'unbundled-bezier', 'control-point-distances': '30 -30', 'control-point-weights': '0.25 0.75' }
                }
            ],
            // Initial layout is preset
            layout: {
                name: 'preset',
                positions: presetPositions, // Use the defined positions
                padding: 30 // Add some padding
            },
            zoom: 0.9,
            pan: { x: 0, y: 0 },
            minZoom: 0.1,
            maxZoom: 2
        });
    } catch (error) {
        console.error("Error initializing Cytoscape:", error);
        // Optionally display an error message to the user in the #cy div
        const cyContainer = document.getElementById('cy');
        if (cyContainer) {
            cyContainer.innerHTML = '<p class="text-red-500 p-4">Error loading graph. Please check console.</p>';
        }
    }


    // --- Layout Selector Logic ---
    const layoutSelector = document.getElementById('layoutSelector');
    if (layoutSelector && cy) { // Check if both selector and cy exist
        layoutSelector.addEventListener('change', function(event) {
            const selectedLayout = event.target.value;

            // Define common layout options
            let layoutOptions = {
                name: selectedLayout,
                animate: true, // Animate the transition
                animationDuration: 500, // Duration in ms
                padding: 40, // General padding for most layouts
                fit: true, // Fit the viewport to the graph
            };

            // Add specific options for certain layouts if needed
            if (selectedLayout === 'preset') {
                layoutOptions.positions = presetPositions; // Reapply original positions
            } else if (selectedLayout === 'cose') {
                layoutOptions.nodeRepulsion = () => 400000;
                layoutOptions.idealEdgeLength = () => 100;
                layoutOptions.edgeElasticity = () => 100;
                layoutOptions.nestingFactor = 5; // Adjust for compound nodes
                layoutOptions.gravity = 80;
                layoutOptions.numIter = 1000;
                layoutOptions.initialTemp = 200;
                layoutOptions.coolingFactor = 0.95;
                layoutOptions.minTemp = 1.0;
            } else if (selectedLayout === 'breadthfirst') {
                layoutOptions.directed = false; // Treat as undirected for layout
                layoutOptions.grid = true; // Try using grid spacing
                layoutOptions.spacingFactor = 1.5;
                 // Attempt to define root nodes (e.g., top-level groups)
                layoutOptions.roots = cy.nodes(':parent'); // Use parent nodes as roots
            } else if (selectedLayout === 'concentric') {
                layoutOptions.concentric = function(node){ return node.degree(); }; // Arrange by node degree
                layoutOptions.levelWidth = function(nodes){ return Math.max(1, nodes.maxDegree() / 4); }; // Adjust level width based on max degree
                layoutOptions.spacingFactor = 1.2;
            }
             // Add more else if blocks for other layouts (e.g., cose-bilkent, cola) if you use them

            // Run the new layout
            try {
                cy.layout(layoutOptions).run();
            } catch (error) {
                console.error(`Error applying layout "${selectedLayout}":`, error);
                // Optionally notify the user
                alert(`Could not apply layout: ${selectedLayout}. Check console for details.`);
                 // Revert to preset if layout fails?
                 // cy.layout({ name: 'preset', positions: presetPositions }).run();
            }
        });
    } else {
        if (!layoutSelector) console.error("Layout selector element not found.");
        if (!cy) console.error("Cytoscape instance (cy) not initialized (check for earlier errors).");
    }


    // --- Chart.js Charts ---
    Chart.defaults.color = '#9ca3af'; // Default font color (gray-400)
    Chart.defaults.borderColor = '#4b5563'; // Default border color (gray-600)

    // Categories Chart (Donut)
    const categoriesCtx = document.getElementById('categoriesChart')?.getContext('2d'); // Optional chaining
    if (categoriesCtx) {
        try {
            new Chart(categoriesCtx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        label: 'Categories',
                        data: [26, 21, 14, 36, 14], // Percentages from the image
                        backgroundColor: [
                            '#3b82f6', // blue-500
                            '#06b6d4', // cyan-500
                            '#14b8a6', // teal-500
                            '#6366f1', // indigo-500
                            '#4b5563'  // gray-600 (for the remaining slice)
                        ],
                        borderWidth: 0, // No borders between segments
                        cutout: '75%' // Makes it a donut chart
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: true }
                    }
                }
            });
        } catch (error) {
            console.error("Error initializing Categories Chart:", error);
        }
    } else {
        console.warn("Canvas element for Categories Chart not found.");
    }

    // Trend Chart (Line)
    const trendCtx = document.getElementById('trendChart')?.getContext('2d');
     if (trendCtx) {
        try {
            new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [{
                        label: 'Trend Data',
                        data: [23, 56, 73, 20, 70, 50, 90], // Approximate data from image
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4, pointRadius: 0, borderWidth: 2, fill: false
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                     scales: {
                        y: {
                            beginAtZero: false, position: 'right',
                            grid: { color: '#374151', drawBorder: false, drawTicks: false },
                             ticks: {
                                 padding: 10, font: { size: 10 },
                                 callback: function(value) {
                                     const shownTicks = [23, 56, 73, 160];
                                     if (shownTicks.includes(value)) return value;
                                     return null;
                                 },
                                  min: 23, max: 160 // Ensure ticks are visible
                            }
                        },
                         x: {
                             grid: { display: false },
                             ticks: { font: { size: 10 } }
                         }
                    },
                    plugins: { legend: { display: false } }
                }
            });
         } catch (error) {
            console.error("Error initializing Trend Chart:", error);
         }
     } else {
        console.warn("Canvas element for Trend Chart not found.");
    }

    // Values Chart (Bar)
    const valuesCtx = document.getElementById('valuesChart')?.getContext('2d');
     if (valuesCtx) {
        try {
            new Chart(valuesCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Values',
                        data: [1000, 1500, 1200, 1800, 1400, 1900, 2100, 2000, 2300, 1800, 2200, 5000],
                        backgroundColor: '#3b82f6', borderRadius: 2, barPercentage: 0.6, categoryPercentage: 0.7
                    }]
                },
                options: {
                     responsive: true, maintainAspectRatio: false,
                    scales: {
                         y: {
                             beginAtZero: true, position: 'right',
                             grid: { display: false },
                             ticks: {
                                 padding: 10, font: { size: 10 }, stepSize: 1000,
                                 callback: function(value) {
                                     if (value === 0) return null;
                                     return value === 1000 ? '1000' : null;
                                 }
                             }
                         },
                         x: {
                             grid: { display: false },
                             ticks: { display: false }
                         }
                    },
                    plugins: { legend: { display: false } }
                }
            });
         } catch (error) {
            console.error("Error initializing Values Chart:", error);
         }
     } else {
        console.warn("Canvas element for Values Chart not found.");
    }

}); // End DOMContentLoaded