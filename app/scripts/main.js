/*global D3Talk, $*/


circleSvg = {
    data: [30, 60, 293],
    update: function(selector){
        this.selector = selector || this.selector;
        this.svg = d3.select(this.selector);
        this.circle = this.svg.selectAll('circle')
                .data(this.data, function(d) { return d; })
        this.circle.transition().duration(500)
                .style('fill', 'steelblue');

        this.circle.enter().append('circle')
                .style('fill', 'green')
                .style('opacity', 1)
                .attr('cy', 60)
                .attr('cx', function(d, i) { return i * 100 + 30; })
                .attr('r', 0)
                .transition().duration(500)
                .attr('r', function(d) { return Math.sqrt(d); })

        this.circle.exit()
            .transition().duration(500)
            .style('fill', 'brown')
            .style('opacity', 0.2)
            .remove();
    },
    add: function(){
        this.data.push(Math.floor(Math.random() * 600) + 30);
        this.update();
    },
    addWrong: function(){
        this.data.push(10000);
        this.update();
    },
    remove: function(){
        this.data.pop();
        this.update();
    }
};

window.D3Talk = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        var $page = $('#fullpage');
        $page.fullpage({
            verticalCentered: false,
            resize: false,
            controlArrows: false,
            onLeave: function(index, nextIndex, direction){
                var lastSection = ['.section:nth-child(', index, ')'].join('');
                var thisSection = ['.section:nth-child(', nextIndex, ')'].join('');
                if(direction === 'down'){
                    $(lastSection).find('.to-show:not(.shown)').addClass('shown');
                    $(thisSection).find('.to-show').removeClass('shown');
                } if(direction === 'up'){
                    $(lastSection).find('.to-show.shown').removeClass('shown');
                }
            },
            afterRender: function(){
                $page.removeClass('invisible');
            }
        });
        $(document).on('keypress', function(e){
            if(e.which === 107){
                $('.to-show:not(.shown)').first().addClass('shown');
            }
            if(e.which === 106){
                $('.to-show.shown').last().removeClass('shown');
            }
        });
    }
};

$(document).ready(function () {
    'use strict';
    D3Talk.init();
});
