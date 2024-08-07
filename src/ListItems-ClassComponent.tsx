
import React, { Component } from 'react';

type ListItem = {
    alpha_two_code: string;
    country: string;
    domains: string[];
    name: string;
    'state - province'?: string;
    web_pages: string[];
}

export class ListItems extends Component {
    state: { loading: boolean, listItems: ListItem[] | null, error: null | unknown }
    constructor(props: any) {
        super(props);

        this.state = {
            listItems: null,
            error: null,
            loading: false
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    async fetchData() {
        try {
            this.setState((state) => ({
                ...state,
                loading: true
            }))
            const response = await fetch('http://universities.hipolabs.com/search?country=United+States');
            const data = await response.json();
            this.setState({ listItems: data })
        } catch (e) {
            this.setState({ error: e })
        } finally {
            this.setState({ loading: false })
        }
    }


    render() {
        const { loading, error, listItems } = this.state;
        if (loading) {
            return (<div>Loading...</div>)
        }
        if (error) {
            return (
                <div>Error loading data</div>
            )
        }
        if (listItems) {
            return (
                <div>
                    <ul>
                        {listItems.map((item, index) => <li key={`${index}_${item.name}`}>{item.name}</li>)}
                    </ul>
                </div>
            )
        }
        return null;

    }
}