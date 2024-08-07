import { useEffect, useState } from "react"

type ListItem = {
    alpha_two_code: string;
    country: string;
    domains: string[];
    name: string;
    'state - province'?: string;
    web_pages: string[];
}

export const ListItems = () => {
    const { listItems, error, loading } = useListItems();
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

const useListItems = () => {
    const [listItems, setListItems] = useState<ListItem[] | null>(null);
    const [error, setError] = useState<unknown | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getData = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://universities.hipolabs.com/search?country=United+States');
            const data = await response.json();
            setListItems(data);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return { listItems, error, loading }

}