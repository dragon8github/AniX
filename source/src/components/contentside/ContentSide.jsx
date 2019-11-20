import React, { Component } from 'react';
import { Section1 } from './Section1';
import { Section2 } from './Section2';
import { Section3 } from './Section3';
import { Section4 } from './Section4';

export class ContentSide extends Component {

    items = [
        { link: "#section1", title: "Overview", isActive: true },
        { link: "#section15", title: "Quick Start", isActive: false },
        { link: "#section2", title: "Other Versions", isActive: false },
        { link: "#section3", title: "API & Demo", isActive: false }
    ];

    clickHandler(item, index) {
        this.inverseSelection(index);
        let top = this.getOffsetTop(document.querySelector(item.link));
        top = Math.max(0, top - 50);
        this.scrollTo(top, 500);
        this.setState({});
    }

    inverseSelection(index){
        for (let i = 0; i < this.items.length; i++)
            this.items[i].isActive = false;
        this.items[index].isActive = true;
    }

    getOffsetTop(dom) {
        let top = 0;
        let offsetParent = dom;

        while (offsetParent !== null && offsetParent !== document.body) {
            top += offsetParent.offsetTop || 0;
            offsetParent = offsetParent.offsetParent;
        }
        return top;
    }

    timeoutId;
    scrollTo(top, time) {
        let from = 0;
        let to = top;
        let t = 1000 / 60;
        let k = Math.floor(time / t);
        let d = ((to - from) / k) | 0;
        let i = 0;
        let pos = from;

        clearInterval(this.timeoutId);
        this.timeoutId = setInterval(() => {
            pos += d;
            i++;
            window.scrollTo(0, pos);
            if (i >= k) {
                clearInterval(this.timeoutId);
                window.scrollTo(0, to);
            }
        }, t);
    }

    get navlist() {
        return this.items.map((item, i) => {
            return (
                <li key={i} className="nav-item pointer" onClick={this.clickHandler.bind(this, item, i)}>
                    <a className={item.isActive ? 'nav-link pointer active' : 'nav-link pointer'}>{item.title}
                        <span className="sr-only">(current)</span>
                    </a>
                </li>
            )
        })
    }

    render() {
        return (
            <div className="content-side">
                <div className="container" style={{ height: 'auto' }}>

                    <div className="row">
                        <div className="col-md-2 sidebar">
                            <ul className="nav nav-pills flex-column">
                                {this.navlist}
                            </ul>
                        </div>

                        <div className="col-md-10">
                            <Section1 />
                            <Section2 />
                            <Section3 />
                            <Section4 />
                        </div>
                    </div>
                </div>

                <div className="col-md-12 bottom">
                    AniX - Super easy and lightweight css animation library.
                </div>
            </div>
        );
    }
}