import React, {useState} from 'react';
import TruncateMarkup from 'react-truncate-markup';

const ReadMore = ({longText}) => {
    const [shouldTruncate, setShouldTruncate] = useState(true);

    const readMoreEllipsis = (
        <span>
            ...{' '}
            <span
                onClick={() => {
                    setShouldTruncate(!shouldTruncate);
                }}
                className={'read-more'}>
                Read more
            </span>
        </span>
    );

    return shouldTruncate ? (
        <TruncateMarkup lines={6} ellipsis={readMoreEllipsis}>
            <div className={'long-text-container'}>{longText}</div>
        </TruncateMarkup>
    ) : (
        <div className={'long-text-container'}>
            {longText}
            <span
                onClick={() => {
                    setShouldTruncate(!shouldTruncate);
                }}
                className={'read-more'}>
                {' Show Less'}
            </span>
        </div>
    );
};
export default ReadMore;
