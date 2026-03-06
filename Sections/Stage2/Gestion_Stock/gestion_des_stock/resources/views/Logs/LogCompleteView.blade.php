@extends('admin')
@section('content')
<div class="container mt-4">
    <h2>📜 Historique complet des actions</h2>
    <div class="card">
        <div class="card-body">
            @if(empty($historiqueComplet))
                <p>Aucune action enregistrée aujourd'hui.</p>
            @else
                <ul>
                    @foreach ($historiqueComplet as $log)
                        <li>{{ $log }}</li>
                    @endforeach
                </ul>
            @endif
        </div>
    </div>
    <a href="{{ route('dashboardView') }}" class="btn btn-primary mt-3">Retour au dashboard</a>
</div>
@endsection