import React from 'react';
import styled from 'styled-components';

const TVShowContainer = styled.div`
    width: 100%;
    min-height: 6em;
    border-bottom: 2px solid #D8D8D852;
    padding: 6px 8px;
    display: flex;
    align-items: center;
`;

const Thumbnail = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    flex: 0.4;

    img {
        width: auto;
        height: 100%;
        max-height: 96px;
    }
`;

const ShowName = styled.h3`
    font-size: 15px;
    color: #000;
    margin-left: 10px;  // Give some space between the thumbnail image and the TV show name.
    display: flex;
    flex: 2;
`;

const Rating = styled.span`
    font-size: 16px;
    color: #A1A1A1;
    margin-right: 10px;
    display: flex;
    flex: 0.2;
`;

export const TVShow = props => {
    const { thumbnailSrc, showName, rating } = props;
    return (
        <TVShowContainer>
            <Thumbnail>
                <img src={thumbnailSrc} />
            </Thumbnail>
            <ShowName>{showName}</ShowName>
            <Rating>{rating || "N/A"}</Rating>
        </TVShowContainer>
    );
};