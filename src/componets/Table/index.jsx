import React from 'react';

class SimpleTable extends React.Component {
    render() {
        return (
            <div>
                <h2>Simple Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John</td>
                            <td>30</td>
                            <td>USA</td>
                        </tr>
                        <tr>
                            <td>Mary</td>
                            <td>25</td>
                            <td>Canada</td>
                        </tr>
                        <tr>
                            <td>David</td>
                            <td>40</td>
                            <td>UK</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SimpleTable;
