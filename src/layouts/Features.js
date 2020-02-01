import React from 'react';
import { Card } from '../components/Card';
import {ReactComponent as AnywhereIcon} from '../assets/icon-access-anywhere.svg';
import {ReactComponent as SecurityIcon} from '../assets/icon-security.svg';
import {ReactComponent as CollaborationIcon} from '../assets/icon-collaboration.svg';
import {ReactComponent as StoreIcon} from '../assets/icon-any-file.svg';

export const Features = () => {
    return (
        <section className="features-section">
            <Card
                title="Access your files anywhere"
                icon={<AnywhereIcon />}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua.
            </Card>
            <Card
                title="Security You can trust"
                icon={<SecurityIcon />}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua.
            </Card>
            <Card
                title="Real-time collaboration"
                icon={<CollaborationIcon />}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua.
            </Card>
            <Card
                title="Store any type of file"
                icon={<StoreIcon />}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua.
            </Card>
        </section>
    )
}