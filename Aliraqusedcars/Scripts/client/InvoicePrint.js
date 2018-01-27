var
    sUrl = '/api/data.aspx/',
    renderSVG = function (svg, width, height) {
            document.createElement('canvas')
            var c = document.createElement('canvas');
            c.width = width || 500;
            c.height = height || 500;
            document.getElementById('sig').innerHTML = '';
            document.getElementById('sig').appendChild(c);
            if (typeof FlashCanvas != "undefined") {
                FlashCanvas.initElement(c);
            }
            canvg(c, svg, {
                log: true, renderCallback: function (dom) {
                    if (typeof FlashCanvas != "undefined") {
                        document.getElementById('sig').innerHTML = 'svg not supported';
                    } else {
                        var svg = (new XMLSerializer()).serializeToString(dom);
                        document.getElementById('sig').innerHTML = svg;
                    }
                }
            });
            $('#SaveSignature,#clear').addClass('hidden');
        };
        $('.printme').click(function () {
            window.print();
        });