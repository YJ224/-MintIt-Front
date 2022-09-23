import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import ShareDropdown from "@components/share-dropdown";
import ShareModal from "@components/modals/share-modal";
import Button from "@components/ui/button";
import { formatDate } from "@utils/date";
import { useSelector, useDispatch } from "react-redux";
import {
    setCurrentCollection,
    toggleMintConfirmDialog,
} from "src/store/collection.module";
import { toggleConnectWalletDialog } from "src/store/wallet.module";

const CollectionDetailsIntroArea = ({ className, space, data }) => {
    const dispatch = useDispatch();
    const connected = useSelector((state) => state.wallet.connected);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const shareModalHandler = () => setIsShareModalOpen((prev) => !prev);

    useEffect(() => {
        dispatch(setCurrentCollection(data));
    }, [data]);

    const onMint = () => {
        if (connected) {
            dispatch(toggleMintConfirmDialog());
        } else {
            dispatch(toggleConnectWalletDialog());
        }
    };

    return (
        <>
            <ShareModal
                show={isShareModalOpen}
                handleModal={shareModalHandler}
            />
            <div className="rn-author-bg-area position-relative ptb--150">
                <img src={data.bannerImageUrl} />
                {data.bannerImageUrl && (
                    <Image
                        src={data.bannerImageUrl}
                        alt={data.name}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        priority
                    />
                )}
            </div>
            <div
                className={clsx(
                    "rn-author-area",
                    space === 1 && "mb--30 mt_dec--120",
                    className
                )}
            >
                <div className="container">
                    <div className="row padding-tb-50 align-items-center d-flex">
                        <div className="col-lg-3">
                            <div className="author-wrapper">
                                <div className="author-inner">
                                    {data.imageUrl && (
                                        <div className="user-thumbnail">
                                            <Image
                                                src={data.imageUrl}
                                                alt={data.name}
                                                width={140}
                                                height={140}
                                                layout="fixed"
                                            />
                                        </div>
                                    )}

                                    <div className="rn-author-info-content">
                                        <h4 className="title">{data.name}</h4>
                                        <div className="d-flex align-items-center">
                                            <a
                                                href="https://twitter.com"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="social-follw mb--0"
                                            >
                                                <i className="feather-twitter" />
                                                <span className="user-name">
                                                    {data.twitter}
                                                </span>
                                            </a>
                                            <div className="author-button-area mt--0 ml--10">
                                                <div className="count at-follw">
                                                    <ShareDropdown />
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            path={`/provenance-hash/${data["provenance-hash"]}`}
                                            className="mt--15"
                                        >
                                            View Provenance
                                        </Button>
                                        {/* <div className="follow-area">
                                            <div className="follow followers">
                                                <span>
                                                    {data.followers}{" "}
                                                    <a
                                                        href="https://twitter.com"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="color-body"
                                                    >
                                                        followers
                                                    </a>
                                                </span>
                                            </div>
                                            <div className="follow following">
                                                <span>
                                                    {data.following}{" "}
                                                    <a
                                                        href="https://twitter.com"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="color-body"
                                                    >
                                                        following
                                                    </a>
                                                </span>
                                            </div>
                                        </div> */}
                                        {/* <div className="author-button-area">
                                            <span className="btn at-follw follow-button">
                                                <i className="feather-user-plus" />
                                                Follow
                                            </span>
                                            <button
                                                type="button"
                                                className="btn at-follw share-button"
                                                onClick={shareModalHandler}
                                            >
                                                <i className="feather-share-2" />
                                            </button>

                                            <Anchor
                                                path="/edit-profile"
                                                className="btn at-follw follow-button edit-btn"
                                            >
                                                <i className="feather feather-edit" />
                                            </Anchor>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="row mb-5 col_textbox d-flex align-items-center">
                                <div className="col-md-6 col-lg-6">
                                    <p>{data.description}</p>
                                </div>
                                <div className="col-md-6 col-lg-6">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="status-box">
                                                <div>Creator</div>
                                                <div>{data.creator}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="status-box">
                                                <div>Total</div>
                                                <div>{data.size}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="status-box">
                                                <div>Price</div>
                                                <div>
                                                    {data["mint-price"]} $KDA
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="status-box">
                                                <div>Type</div>
                                                <div>{data.type}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="status-box">
                                                <div>Start</div>
                                                <div>
                                                    {formatDate(
                                                        data["mint-starts"]
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="status-box">
                                                <div>End</div>
                                                <div>
                                                    {formatDate(
                                                        data["premint-ends"]
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container d-flex my-4">
                <div className="mint-status-box">Public Round</div>
                <div className="mint-status-box">Mint: 20 KDA</div>
                <div className="mint-status-box">Remaining: 1029</div>
                <Button className="ms-4" onClick={onMint}>
                    Mint Now
                </Button>
            </div>
        </>
    );
};

CollectionDetailsIntroArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
    data: PropTypes.shape({
        bannerImageUrl: PropTypes.string,
        createdAt: PropTypes.string,
        creator: PropTypes.string,
        description: PropTypes.string,
        id: PropTypes.string,
        imageUrl: PropTypes.string,
        "mint-price": PropTypes.number,
        "mint-royalties": PropTypes.array,
        "mint-starts": PropTypes.string,
        name: PropTypes.string,
        "premint-ends": PropTypes.string,
        "premint-whitelist": PropTypes.array,
        "provenance-hash": PropTypes.string,
        "sale-royalties": PropTypes.array,
        size: PropTypes.number,
        slug: PropTypes.string,
        status: PropTypes.string,
        "token-list": PropTypes.array,
        type: PropTypes.string,
        updatedAt: PropTypes.string,
    }),
};
CollectionDetailsIntroArea.defaultProps = {
    space: 1,
};

export default CollectionDetailsIntroArea;
