import { forwardRef } from 'react';

function Anchor(
    { className, ...props }: React.LinkHTMLAttributes<HTMLAnchorElement>,
    ref: React.ForwardedRef<HTMLAnchorElement>,
): JSX.Element {
    return (
        <a
            ref={ref}
            className={`text-indigo-600 underline cursor-pointer${
                className ? ' ' + className : ''
            }`}
            {...props}
        />
    );
}

export default forwardRef(Anchor);
