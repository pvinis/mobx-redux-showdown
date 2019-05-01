import { BehaviorSubject, merge, from } from 'rxjs'
import { map, flatMap, tap, filter, withLatestFrom } from 'rxjs/operators'

const EventsScreenController = (component, input = {}) => {
    const code = component.getProp('code')
    const valueSet = component.getProp('valueSet')

    const isLoading = new BehaviorSubject(false)

    const responseRequest = valueSet.pipe(
        map(v => 'http://hapi.fhir.org/baseDstu3/ValueSet/' + v),
        tap(() => isLoading.next(true)),
        flatMap(url => from(fetch(url))),
    )

    const responseNotOk = responseRequest.pipe(
        filter(resp => !resp.ok),
    )

    const responseOk = responseRequest.pipe(
        filter(resp => resp.ok),
        flatMap(resp => from(resp.json())),
        map(json => {
          const items = json.compose.include[0].concept // FHIR fun
          const values = {} // {code: display}
          items.forEach(item => values[item.code] = item.display)
          return values
        }),
        withLatestFrom(code),
        map(([vals, code]) => vals[code]),
    )

    const display = merge(
        responseNotOk,
        responseOk,
    ).pipe(
        tap(() => isLoading.next(false)),
    )

    const requiredToObserve = merge(
        display,
    )

    return {
        input: {
        },
        output: {
            display,
            isLoading,
            // error,
        },
        sub: {
          requiredToObserve,
        },
    }
}

export default EventsScreenController
