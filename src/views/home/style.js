import styled from 'styled-components';
import {grayBorderColor, grayColor} from "../../assets/style/var";

// 左右布局相关***********************************
export const Left = styled.div`
  
`;
export const Right = styled.div`
  min-height: 400px;
`;
// banner 相关***********************************
export const Banner = styled.div`
    color: ${grayColor};
    position: relative;
    overflow: hidden;
    cursor: pointer;
    .ant-carousel {
    position: relative;
    .slick-slide{
        text-align: center;
        height: 270px;
        line-height: 160px;
        background: #364d79;
        overflow: hidden;
        position: relative;
        img {
          height: 100%;
          width: 100%;
        }
    }
    }
    .prev, .next {
        opacity: 0;
        transition: all 0.3s ease-in-out;
        position: absolute;
        background-image: none;
        background-color: rgba(0,0,0,.4);
        height: 50px;
        width: 40px;
        top: 40%;
        filter: alpha(opacity=50);
        font-size: 20px;
        color: #fff;
        text-align: center;
        text-shadow: 0 1px 2px rgba(0,0,0,.6);
        cursor: pointer;
    }
    .prev {
        transform: translateX(-40px);
    }
    .next {
        right: 0;
        transform: translateX(40px);
    }
    &:hover .prev, &:hover .next {
        opacity: 1;
        transform: translateX(0);
    }
`;
// 专题相关
export const Topic = styled.div`
    height: 50px;
    line-height: 1;
    display: block;
    margin-bottom: 10px;
    &:nth-child(1) {
        margin-top: -4px;
    }
    img {
        height: 50px;
        width: 100%;
        border-radius: 4px;
    }
`;
// 推荐作者
export const RecommendAuthor = styled.div`
    min-height: 300px;
    color: ${grayColor};
    .author-head {
        margin-bottom: 15px;
        .title {
            font-size: 15px; 
        }
    }
    .author-list {
        &-item {
            margin-bottom: 10px;
            &-image {
                margin-right: 10px;
                img {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                }
            }
            &-text {
                margin-right: 20px;
                h3{
                    font-size: 15px;
                    margin-bottom: 5px;
                }
                p {
                    font-size: 12px;
                    color: ${grayColor};
                    span:nth-child(2) {
                        margin: 0 4px;
                    }
                }
            }
            &-follow {
                font-size: 14px;
                color: #00e22e;
                cursor: pointer;
                i {
                    font-size: 20px;
                }
            }
        }
    }
`;

// 文章列表*******************************************8
export const Article = styled.div`
    min-height: 1000px;
    margin-top: 30px;
    .article-list {
        &-item {
            padding: 20px;
            border-bottom: 1px solid ${grayBorderColor};   
            cursor: pointer;
            &-left {
                .title {
                    font-size: 13px;
                    color: ${grayColor};
                    margin-bottom: 10px;
                    .hot {
                        font-weight: 500;
                        color: #ff334c;
                    }
                    .original {
                        color: #b71ed7;
                        font-weight: 500;
                    }
                    span:not(:last-child):after {
                        content: "·";
                        margin: 0 .4em;
                        color: #b2bac2;
                    }
                }
                h3 {
                    font-size: 16px;
                    margin-bottom: 15px;
                }
                div {
                    .ant-btn {
                        color: ${grayColor};
                    }
                }
            }
        }
    }
`;